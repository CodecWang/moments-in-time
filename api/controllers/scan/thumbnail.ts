import sharp, { format } from "sharp";
import path from "path";
import { DB_THUMBNAIL_JSON, ThumbnailSize } from "../../configs";
import { nanoid } from "nanoid";
import { readJsonFile, writeJsonFile } from "../../db";

export async function generateThumbnail(
  photoID: string,
  filePath: string,
  data: Buffer
) {
  const filename = path.basename(filePath, path.extname(filePath));

  const img = sharp(data);
  const metadata = await img.metadata();
  const { width, height, exif } = metadata;
  // TODO(arthur): metadata contains exif info, so, no need to import another exiftool?

  if (!width || !height) {
    console.error("no width or height");
    return;
  }

  const sizes = [
    // ThumbnailSize.small,
    // ThumbnailSize.medium,
    ThumbnailSize.large,
  ];

  const thumbnails: Thumbnail[] = [];
  const smallerSize = Math.min(
    width < height ? width : height,
    ThumbnailSize.large
  );
  const outputFilename = `${filename}.thumbnail${ThumbnailSize.large}.jpg`;
  const output = path.join(
    "/Users/arthur/coding/moments-in-time/photos/thumbnails",
    outputFilename
  );
  const outputImg = await img
    .resize(width < height ? { width: smallerSize } : { height: smallerSize })
    .jpeg({ mozjpeg: true })
    .toFile(output);
  thumbnails.push({
    id: nanoid(),
    photoID,
    size: outputImg.size,
    format: outputImg.format,
    width: outputImg.width,
    height: outputImg.height,
    filename: outputFilename,
  });

  console.log(thumbnails);
  const dbThumbnails = await readJsonFile(DB_THUMBNAIL_JSON);
  dbThumbnails.push(...thumbnails);

  await writeJsonFile(dbThumbnails.sort(), DB_THUMBNAIL_JSON);

  return exif;
}
