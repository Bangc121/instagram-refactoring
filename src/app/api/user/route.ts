import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getAllUser } from "@/services/user";
import { getFollowingPostOf } from "@/services/post";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  return getAllUser().then((data) => NextResponse.json(data));
}
