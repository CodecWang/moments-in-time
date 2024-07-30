import Image from "next/image";

interface PhotoProps {
  photo: any;
  style: any;
  src: string;
  width: number;
  height: number;
  top: number;
  left: number;
  index: number;
  onClick: (photo: any) => void;
  onSelect: (photo: any) => void;
}

export function Photo(props: PhotoProps) {
  const { photo, src, style, width, height, top, left, index, onClick } = props;

  return (
    <div
      style={{ ...style, width: "auto", height: "auto" }}
      onClick={() => onClick(photo)}
    >
      <Image src={src} width={width} height={height} alt="" />
    </div>
  );
}
