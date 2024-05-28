import { NextRequest, NextResponse } from "next/server";
import { createPost, getFollowingPostOf } from "@/services/post";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  return getFollowingPostOf(user.username).then((data) =>
    NextResponse.json(data)
  );
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const form = await req.formData();
  const text = form.get("text")?.toString();
  const file = form.get("file") as File;

  if (!text || !file) {
    return new Response("Missing text or file", { status: 400 });
  }

  return createPost(user.id, text, file).then((data) =>
    NextResponse.json(data)
  );
}
