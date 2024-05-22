"use client";

import { DotLoader, GridLoader } from "react-spinners";

import GridSpinner from "./ui/GridSpinner";
import PostListCard from "./PostListCard";
import { SimplePost } from "@/model/post";
import useSWR from "swr";

export default function PostList() {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>("/api/post");

  return (
    <section>
      {loading && (
        <div className="flex justify-center items-center mt-32">
          <GridSpinner />
        </div>
      )}
      {posts && (
        <ul>
          {posts &&
            posts.map((post, index) => (
              <li key={post.id}>
                <PostListCard post={post} priority={index < 2} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
