import { GroupedBy, PhotosLayout } from "./enums";
import { PhotosViewSetting } from "./type";

export const defaultPhotosViewSetting: PhotosViewSetting = {
  groupBy: GroupedBy.Day,
  layout: PhotosLayout.Justified,
  spacing: 2,
  size: 220,
};
