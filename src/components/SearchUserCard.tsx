import Avatar from "./Avatar";
import { SearchUser } from "@/model/user";

type Props = {
  user: SearchUser;
};
export default function SearchUserCard({ user }: Props) {
  const { name, username, email, image, followers, followings } = user;
  return (
    <article className="flex flex-row shadow-md border border-gray-200">
      <Avatar image={image} />
      <div>
        <p>{username}</p>
        <p>{name}</p>
        <p>{`${followers ?? 0} followers ${followings ?? 0} followings`}</p>
      </div>
    </article>
  );
}
