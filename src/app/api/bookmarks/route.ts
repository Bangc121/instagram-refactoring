import { NextRequest, NextResponse } from "next/server";
import { addBookmark, removeBookmark } from "@/services/user";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Autenication required", { status: 401 });
  }

  const { id, bookmark } = await req.json();

  if (!id || bookmark === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = bookmark ? addBookmark : removeBookmark;

  return request(user.id, id)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
