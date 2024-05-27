import { NextRequest, NextResponse } from "next/server";
import { follow, unfollow } from "@/services/user";
import { likePost, unlikePost } from "@/services/post";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Autenication required", { status: 401 });
  }

  const { targetId, follow: isFollow } = await req.json();

  if (!targetId || isFollow === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = isFollow ? follow : unfollow;

  return request(user.id, targetId)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
