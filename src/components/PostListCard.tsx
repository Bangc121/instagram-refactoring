"user client";

import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import CommentForm from "./CommentForm";
import Image from "next/image";
import ModalPortal from "./ui/ModalPortal";
import PostDetail from "./PostDetail";
import PostModal from "./PostModal";
import PostUserAvatar from "./PostUserAvatar";
import { SimplePost } from "@/model/post";
import { useState } from "react";

type Props = {
  post: SimplePost;
  priority?: boolean;
};
export default function PostListCard({ post, priority }: Props) {
  const { userImage, username, image, text, comments, likes, createdAt } = post;
  const [openModal, setOpenModal] = useState(false);
  return (
    <article className=" rounded-lg shadow-md border border-gray-200">
      <PostUserAvatar image={userImage} username={username} />
      <Image
        priority={priority}
        className="w-full object-cover aspect-square"
        src={image}
        alt="post image by ${}"
        width={500}
        height={500}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
