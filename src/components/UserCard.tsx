import { HomeUser, SearchUser } from "@/model/user";

import Avatar from "./Avatar";
import Link from "next/link";

type Props = {
  user: SearchUser;
};
export default function UserCard({
  user: { name, username, email, image, followers, following },
}: Props) {
  return (
    <Link
      href={`/user/${username}`}
      className="flex items-center w-full rounded-sm border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50"
    >
      <Avatar image={image} />
      <div className="text-neutral-500 ml-2">
        <p className="text-black font-bold leading-4">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} followers ${following} followings`}</p>
      </div>
    </Link>
  );
}
