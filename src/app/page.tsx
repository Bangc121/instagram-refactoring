import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section className="w-full flex flex-col md:flex-row max-w-[850px]">
      <div className="w-full basis-3/4 min-w-0">
        <FollowingBar user={user} />
        <PostList />
      </div>
      <div className="w-full basis-1/4 ml-8">
        <SideBar user={user} />
      </div>
    </section>
  );
}
