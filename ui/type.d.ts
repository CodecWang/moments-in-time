interface Photo {
  id: number;
  filePath: string;
  checkSum: string;
  shotTime: Date;
  modifiedTime: Date;

  thumbnails: Thumbnail[];
}

interface Thumbnail {
  width: number;
  height: number;
}
