import { NextRequest, NextResponse } from "next/server";
import { likePost, unlikePost } from "@/services/post";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Autenication required", { status: 401 });
  }

  const { id, like } = await req.json();

  if (!id || like === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = like ? likePost : unlikePost;

  return request(id, user.id)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
