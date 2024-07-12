/** Supported imaged formats */
export const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".tiff",
  ".svg",

  ".NEF",
];

/** Thumbnail size */
export enum ThumbnailSize {
  small = 100,
  medium = 400,
  large = 800,
}

// original size: 3.39GB - 193 张照片
// 一起处理 37.908s
// 795KB - 13.153s
// 7.6MB - 14.395s
// 25.1MB - 18.904s
