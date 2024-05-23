import Image from "next/image";

type Props = {
  image?: string | null;
  size?: "small" | "medium" | "large" | "xlarge";
  highright?: boolean;
};
export default function Avatar({
  image,
  size = "large",
  highright = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highright)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white object-cover rounded-full ${getImageSizeStyle(size)}`}
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
  const sizeStyle = getContainerSize(size);
  return `${baseStyle} ${highrightStyle} ${sizeStyle}`;
}

function getImageSizeStyle(size: Props["size"]): string {
  switch (size) {
    case "small":
      return "w-[34px] h-[34px] p-[0.1rem]";
    case "medium":
      return "w-[42px] h-[42px] p-[0.1rem]";
    case "large":
      return "w-16 h-16 p-[0.2rem]";
    case "xlarge":
      return "w-[138px] h-[138px] p-[0.3rem]";
    default:
      throw new Error(`Invalid size: ${size}`);
  }
}

function getContainerSize(size: Props["size"]): string {
  switch (size) {
    case "small":
      return "w-9 h-9";
    case "medium":
      return "w-11 h-11";
    case "large":
      return "w-[68px] h-[68px]";
    case "xlarge":
      return "w-[142px] h-[142px]";
    default:
      throw new Error(`Invalid size: ${size}`);
  }
}
