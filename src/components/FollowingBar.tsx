"use client";

import Avatar from "./Avatar";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import ScrollableBar from "./ui/ScrollableBar";
import useMe from "@/hooks/useMe";

export default function FollowingBar() {
  const { user, isLoading: loading, error } = useMe();
  const users = user?.followings;

  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-netural-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
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
              <Avatar image={image} size="large" highright />
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
