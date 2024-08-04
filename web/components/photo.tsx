import Image from "next/image";

interface PhotoProps {
  photo: any;
  src: string;
  width: number;
  height: number;
  top: number;
  left: number;
  onClick: (photo: any) => void;
  onSelect: (photo: any) => void;
}

export function Photo(props: PhotoProps) {
  const { photo, src, width, height, top, left, onClick } = props;

  return (
    <div
      className="absolute"
      style={{ top, left }}
      onClick={() => onClick(photo)}
    >
      <Image src={src} width={width} height={height} alt="" />
    </div>
  );
}
