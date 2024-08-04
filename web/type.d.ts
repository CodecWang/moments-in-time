import { GroupBy, GalleryLayout } from "@/enums";

interface PhotosViewSetting {
  groupBy?: GroupBy;
  layout?: GalleryLayout;
  spacing?: number;
  size?: number;
}

interface PhotoGroup {
  title: string;
  photos: Photo[];
}

interface Album {
  id: number;
  title: number;
  cover: Photo;
  photos: Photo[];
}
