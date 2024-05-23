import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/services/user";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
};
export default async function UserPage({ params: { username } }: Props) {
  // 사용자의 프로필 정보
  // 하단 3개의 탭
  const user = await getUserForProfile(username);

  if (!user) notFound();
  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}
