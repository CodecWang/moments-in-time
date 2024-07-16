interface Photo {
  id: string;
  path: string;
  filename: string;
  createdTime: string;
  modifiedTime: string;
  // faces: Object[];

  createdAt?: string;
  updatedAt?: string;
}

interface Album {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PhotoAlbum {
  id: string;
  photoID: string;
  albumID: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Thumbnail {
  id: string;
  photoID: string;
  filename: string;
  size: number;
  width: number;
  height: number;
  format: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Exif {
  id: string;
  photoId: string;
  camera: string;
  maker: string;
  lens: string;
  exposure: number;
  aperture: number;
  iso: number;
  shotDate: string;
  gpsLatitude: number;
  gpsLongitude: number;

  createdAt?: string;
  updatedAt?: string;
}
