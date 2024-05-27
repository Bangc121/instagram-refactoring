"use client";

import GridSpinner from "./ui/GridSpinner";
import PostListCard from "./PostListCard";
import usePosts from "@/hooks/usePosts";

export default function PostList() {
  const { posts, isLoading: loading } = usePosts();

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
