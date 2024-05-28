import { Metadata } from "next";
import NewPost from "@/components/NewPost";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "New Page",
  description: "create new post",
};
export default async function NewPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  return <NewPost user={session.user}></NewPost>;
}
