import Avatar from "./Avatar";
import FollowButton from "./FollowButton";
import { ProfileUser } from "@/model/user";

type Props = {
  user: ProfileUser;
};
export default function UserProfile({ user }: Props) {
  const { image, name, username, email, followings, followers, posts } = user;
  const info = [
    {
      title: "posts",
      data: posts,
    },
    {
      title: "followers",
      data: followers,
    },
    {
      title: "following",
      data: followings,
    },
  ];
  return (
    <section className="w-full flex flex-col md:flex-row justify-center items-center py-12 border-b border-neutral-300">
      <Avatar image={user.image} size="xlarge" highright />
      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col md:flex-row items-center">
          <h1 className="text-2xl md:mr-8 my-2 md:mb-0">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="my-4 flex gap-4">
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className="font-bold mr-1">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-center md:text-start">{name}</p>
      </div>
    </section>
  );
}
