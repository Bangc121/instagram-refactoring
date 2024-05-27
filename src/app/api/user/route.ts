import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getAllUser } from "@/services/user";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  return getAllUser().then((data) => NextResponse.json(data));
}
