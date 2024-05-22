import HomeFillIcon from "./ui/icons/HomeFillIcon";

export default function CommentForm() {
  return (
    <form className="flex items-center border-t border-neutral-300 p-3">
      <HomeFillIcon />
      <input
        className="w-full ml-2 border-none outline-none p-3"
        type="text"
        placeholder="Add a comment..."
      />
      <button className="font-bold text-sky-400 ml-2">Post</button>
    </form>
  );
}
