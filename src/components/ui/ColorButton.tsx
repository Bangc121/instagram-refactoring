type Props = {
  text: string;
  onClick: () => void;
};
export default function ColorButton({ text, onClick }: Props) {
  return (
    <div className=" rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.1rem]">
      <button
        className="bg-white rounded-sm text-base p-[0.3rem] hover:opacity-75 transition-opacity"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
