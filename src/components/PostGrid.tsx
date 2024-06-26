import GridSpinner from "./ui/GridSpinner";
import PostGridCard from "./PostGridCard";
import { SimplePost } from "@/model/post";
import usePosts from "@/hooks/usePosts";
import useSWR from "swr";
import { useState } from "react";

export default function PostGrid() {
  const { posts, isLoading } = usePosts();

  return (
    <div className="w-full text-center">
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
