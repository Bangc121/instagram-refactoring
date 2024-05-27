import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getUserByUsername } from "@/services/user";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
    // 401 Unauthorized
  }
  return getUserByUsername(user.username).then((data) =>
    NextResponse.json(data)
  );
}
