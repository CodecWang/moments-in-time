import { GroupedBy, PhotosLayout } from "@/enums";

interface PhotosViewSetting {
  groupBy?: GroupedBy;
  layout?: PhotosLayout;
  spacing?: number;
  size?: number;
}

interface PhotoGroup {
  title: string;
  photos: Photo[];
}
