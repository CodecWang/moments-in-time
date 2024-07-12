import sharp from "sharp";
import path from "path";
import { ThumbnailSize } from "./configs";

export async function generateThumbnail(filePath: string) {
  const filename = path.basename(filePath, path.extname(filePath));

  const img = sharp(filePath);
  const metadata = await img.metadata();
  const { width, height } = metadata;
  // TODO(arthur): metadata contains exif info, so, no need to import another exiftool?

  if (!width || !height) {
    console.error("no width or height");
    return;
  }

  const sizes = [
    ThumbnailSize.small,
    ThumbnailSize.medium,
    ThumbnailSize.large,
  ];

  sizes.forEach(async (size) => {
    const smallerSize = Math.min(width < height ? width : height, size);
    const output = path.join(
      "/Users/arthur/coding/moments-in-time/photos/thumbnails",
      `${filename}.thumbnail${size}.jpg`
    );
    await img
      .resize(width < height ? { width: smallerSize } : { height: smallerSize })
      .jpeg({ mozjpeg: true })
      .toFile(output);
  });
}
