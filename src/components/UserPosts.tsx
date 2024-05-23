"use client";

import { ProfileUser } from "@/model/user";
import useSWR from "swr";
import { useState } from "react";
import PostIcon from "./ui/icons/PostIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import PostGrid from "./PostGrid";

type Props = {
  user: ProfileUser;
};

const tabs = [
  {
    type: "posts",
    icon: <PostIcon />,
  },
  {
    type: "saved",
    icon: <BookmarkIcon />,
  },
  {
    type: "liked",
    icon: <HeartIcon />,
  },
];
export default function UserPosts({ user }: Props) {
  const { username } = user;
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase">
        {tabs.map(({ type, icon }) => (
          <li
            className={`mx-12 p-4 cusor-pointer border-black ${type === query && "font-bold border-t"}`}
            key={type}
            onClick={() => setQuery(type)}
          >
            <button className="scale-150 md:scale-100">{icon}</button>
            <span className="hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  );
}
