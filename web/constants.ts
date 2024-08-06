import { GroupBy, GalleryLayout } from "./enums";
import { PhotosViewSetting } from "./type";

export const DEFAULT_PHOTOS_VIEW: PhotosViewSetting = {
  groupBy: GroupBy.Day,
  layout: GalleryLayout.Justified,
  spacing: 2,
  size: 220,
};

export const CACHE_KEY = {
  groupAlbumsBy: "group-albums-by",
};
