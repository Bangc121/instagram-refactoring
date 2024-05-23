"use client";

import { ProfileUser } from "@/model/user";
import useSWR from "swr";
import { useState } from "react";

type Props = {
  user: ProfileUser;
};
export default function UserPosts({ user }: Props) {
  // api/user/${username}/posts
  // api/user/${username}/liked
  // api/users/${username}/bookmarks

  const [tab, setTab] = useState<"posts" | "liked" | "bookmarks">("posts");
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(`/api/users/${user.username}/${tab}`);
  return <></>;
}
