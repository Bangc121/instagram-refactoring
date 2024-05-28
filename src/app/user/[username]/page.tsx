import { Metadata } from "next";
import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { cache } from "react";
import { getUserForProfile } from "@/services/user";
import { notFound } from "next/navigation";
import revalidateProfileUser from "@/app/actions";
type Props = {
  params: {
    username: string;
  };
};

// getUserForProfile() 한번만 사용하기 -> 캐시
// const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUserForProfile(username);
  // revalidateProfileUser(username);
  console.log("user", user);
  if (!user) notFound();
  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUserForProfile(username);
  return {
    title: `${user.name} (@${user.username}) | Instagram`,
    description: `${user.name}'s all posts on Instagram`,
  };
}
