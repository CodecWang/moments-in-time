import { Context } from "koa";
import { promises as fs } from "fs";
import path from "path";
import { IMAGE_EXTENSIONS, ThumbnailSize } from "../../configs";
import { filterTopLevelDirectories } from "./dir";
import exifReader, { Exif as ExifInfo } from "exif-reader";
import { Exif, Photo, Thumbnail } from "../../models";
import { calCheckSum } from "./hash";
import sharp from "sharp";

interface ScannedFile {
  filePath: string;
  createdTime: Date;
  modifiedTime: Date;
}

export default class ScanController {
  public static async scan(ctx: Context) {
    console.time("scanFilesTime");

    const filePathMap = new Map<string, ScannedFile>();
    const originalDirs = [
      // "/Users/arthur/coding/moments-in-time/photos/all",
      "/Users/arthur/coding/moments-in-time/photos/samples",
    ];
    const dirs = filterTopLevelDirectories(originalDirs);

    const photos = await Photo.findAll();
    const photosMap = new Map<string, Photo>(
      photos.map((item) => [item.filePath, item])
    );
    await Promise.all(dirs.map((dir) => scanDirectory(dir, filePathMap)));

    console.log(filePathMap.size);

    const photoCreateOps = [];
    const photoUpdateOps = [];

    for (const [filePath, scannedFile] of filePathMap) {
      const photo = photosMap.get(filePath);
      const buffer = await fs.readFile(filePath);
      const checkSum = await calCheckSum(buffer);
      if (!checkSum) {
        console.error("File is broken, no checkSum can be generated.");
        continue;
      }

      // File hasn't changed
      if (photo && photo.checkSum === checkSum) {
        continue;
      }

      const img = sharp(buffer);
      const { width, height, exif: exifBuffer } = await img.metadata();
      const exif = exifBuffer ? exifReader(exifBuffer) : null;
      const shotTime = exif?.Photo?.DateTimeOriginal || scannedFile.createdTime;

      const fileInfo = {
        checkSum,
        filePath,
        shotTime,
        modifiedTime: scannedFile.modifiedTime,
      };

      const thumbnails = await generateThumbnails(img, width, height, filePath);
      const exifInfo = await generateExifs(exif, shotTime);

      // A new photo
      if (!photo) {
        photoCreateOps.push({ ...fileInfo, exif: exifInfo, thumbnails });
        continue;
      }

      // A photo has been updated
      if (photo.checkSum !== checkSum) {
        photoUpdateOps.push({
          ...fileInfo,
          exif: exifInfo,
          thumbnails,
          id: photo.id,
        });
      }
    }

    if (photoCreateOps.length > 0)
      await Photo.bulkCreate(photoCreateOps, {
        include: [
          { model: Exif, as: "exif" },
          { model: Thumbnail, as: "thumbnails" },
        ],
      });
    if (photoUpdateOps.length > 0) {
      await Promise.all(
        photoUpdateOps.map((op) => Photo.update(op, { where: { id: op.id } }))
      );
    }

    const deleteOps = photos
      .filter((p) => !filePathMap.has(p.filePath))
      .map((p) => p.filePath);
    if (deleteOps.length > 0)
      await Photo.destroy({ where: { filePath: deleteOps } });

    console.timeEnd("scanFilesTime");

    ctx.body = true;
  }
}

async function scanDirectory(
  dir: string,
  scannerFiles: Map<string, ScannedFile>
) {
  const files = await fs.readdir(dir);

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        return scanDirectory(filePath, scannerFiles);
      }

      if (!IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
        return;
      }

      scannerFiles.set(filePath, {
        filePath,
        createdTime: stat.birthtime,
        modifiedTime: stat.mtime,
      });
    })
  );
}

async function generateThumbnails(img, width, height, filePath: string) {
  const filename = path.basename(filePath, path.extname(filePath));
  const smallerSize = Math.min(
    width < height ? width : height,
    ThumbnailSize.large
  );
  const outputFilename = `th_m_${filename}.jpg`;
  const output = path.join(
    "/Users/arthur/coding/moments-in-time/photos/thumbnails",
    outputFilename
  );
  // medium/highres/small/blur/large
  const outputImg = await img
    .resize(width < height ? { width: smallerSize } : { height: smallerSize })
    .jpeg({ mozjpeg: true })
    .toFile(output);

  return [
    {
      variant: 2,
      size: outputImg.size,
      filePath: outputFilename,
      width: outputImg.width,
      height: outputImg.height,
      format: outputImg.format,
    },
  ];
}

async function generateExifs(exif: ExifInfo, shotTime: Date) {
  return {
    shotTime,
    cameraMake: exif?.Image?.Make,
    cameraModel: exif?.Image?.Model,
    iso: exif?.Image?.ISO,
    gpsLatitude: exif?.GPSInfo?.GPSDestLatitude,
    gpsLongitude: exif?.GPSInfo?.GPSDestLongitude,
  };
}
