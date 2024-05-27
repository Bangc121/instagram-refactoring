"user client";

import { Comment, SimplePost } from "@/model/post";

import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import CommentForm from "./CommentForm";
import Image from "next/image";
import ModalPortal from "./ui/ModalPortal";
import PostDetail from "./PostDetail";
import PostModal from "./PostModal";
import PostUserAvatar from "./PostUserAvatar";
import usePosts from "@/hooks/usePosts";
import { useState } from "react";

type Props = {
  post: SimplePost;
  priority?: boolean;
};
export default function PostListCard({ post, priority }: Props) {
  const { userImage, username, image, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();
  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

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
      <ActionBar post={post} onComment={handlePostComment}>
        <p>
          <span className="font-bold mr-1">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className="font-bold my-2 text-sky-400"
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
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
