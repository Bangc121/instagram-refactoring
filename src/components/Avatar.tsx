import Image from "next/image";

type Props = {
  image?: string | null;
  size: "small" | "normal";
  highright?: boolean;
};
export default function Avatar({
  image,
  size = "normal",
  highright = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highright)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white rounded-full ${getImageSizeStyle(size)}`}
        alt="user profile"
        src={image ?? undefined}
        referrerPolicy="no-referrer" // x박스 이슈 해결
      />
    </div>
  );
}

function getContainerStyle(size: Props["size"], highright: boolean): string {
  const baseStyle =
    "rounded-full flex justify-center items-center overflow-hidden";
  const highrightStyle = highright
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";
  const sizeStyle = size === "small" ? "w-9 h-9" : "w-[68px] h-[68px]";
  return `${baseStyle} ${highrightStyle} ${sizeStyle}`;
}

function getImageSizeStyle(size: Props["size"]): string {
  return size === "small"
    ? "w-[34px] h-[34px] p-[0.1rem]"
    : "w-16 h-16 p-[0.2rem]";
}
