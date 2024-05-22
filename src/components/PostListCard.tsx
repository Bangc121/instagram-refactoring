import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import CommentForm from "./CommentForm";
import Image from "next/image";
import { SimplePost } from "@/model/post";

type Props = {
  post: SimplePost;
  priority?: boolean;
};
export default function PostListCard({ post, priority }: Props) {
  const { userImage, username, image, text, comments, likes, createdAt } = post;
  return (
    <article className=" rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        <Avatar image={userImage} highright size={"medium"} />
        <span className="text-gray-900 font-bold ml-2">{username}</span>
      </div>
      <Image
        priority={priority}
        className="w-full object-cover aspect-square"
        src={image}
        alt="post image by ${}"
        width={500}
        height={500}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
    </article>
  );
}
