"use client";

import Button from "./ui/Button";
import { ProfileUser } from "@/model/user";
import { PulseLoader } from "react-spinners";
import revalidateProfileUser from "@/app/actions";
import useMe from "@/hooks/useMe";
import { useState } from "react";

type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  const [isUpdating, setIsUpdating] = useState(false);
  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.followings.find((u) => u.username === username);

  const text = following ? "Unfollow" : "Follow";

  const handleFollow = async () => {
    setIsUpdating(true);
    await toggleFollow(user.id, !following);
    setIsUpdating(false);
    revalidateProfileUser(username);
  };

  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute z-20 flex inset-0 justify-center items-center">
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            red={text === "Unfollow"}
          />
        </div>
      )}
    </>
  );
}
