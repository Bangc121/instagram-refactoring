import { NextRequest, NextResponse } from "next/server";
import { getFollowingPostOf, getPostById } from "@/services/post";

import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

type Context = {
  params: {
    id: string;
  };
};
export async function GET(request: NextRequest, context: Context) {
  console.log("test", context.params.id);
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  return getPostById(context.params.id).then((data) => NextResponse.json(data));
}
