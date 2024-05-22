"use client";

import { DetailUser, User } from "@/model/user";

import Avatar from "./Avatar";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import ScrollableBar from "./ui/ScrollableBar";
import useSWR from "swr";

type Props = {
  user: User;
};

export default function FollowingBar({ user }: Props) {
  const { data, isLoading: loading, error } = useSWR<DetailUser>("/api/me");
  const users = data?.followings;
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-netural-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto">
      {loading ? (
        <BeatLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ username, image }) => (
            <Link
              href={`/user/${username}`}
              key={username}
              className="flex flex-col items-center w-20"
            >
              <Avatar image={image} size="normal" highright />
              <p className="w-full text-center text-sm text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
