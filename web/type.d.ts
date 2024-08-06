import { GroupBy, GalleryLayout } from "@/enums";

interface PhotosViewSetting {
  groupBy?: GroupBy;
  layout?: GalleryLayout;
  spacing?: number;
  size?: number;
}

interface Photo {
  id: number;
  title: string;
  shotTime: Date;
}

interface PhotoGroup {
  title: string;
  photos: Photo[];
}
