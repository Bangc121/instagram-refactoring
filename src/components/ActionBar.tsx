"use client";

import { Comment, SimplePost } from "@/model/post";

import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import CommentForm from "./CommentForm";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import ToggleButton from "./ui/ToggleButton";
import { parseDate } from "@/util/date";
import useMe from "@/hooks/useMe";
import usePosts from "@/hooks/usePosts";

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
  cacheKey: string;
};

export default function ActionBar({
  post,
  children,
  onComment,
  cacheKey,
}: Props) {
  const { id, likes, createdAt } = post;

  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes?.includes(user.username) : false;
  const bookmarked = user ? user.bookmarks.includes(id) : false;

  const handleLike = (like: boolean) => {
    if (user) setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    if (user) setBookmark(id, bookmark);
  };

  const handleComment = (comment: string) => {
    user && onComment({ image: user.image, username: user.username, comment });
  };
  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2 ">{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        {children}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}
