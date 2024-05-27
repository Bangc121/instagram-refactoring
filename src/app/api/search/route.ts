import { NextResponse } from "next/server";
import { searchUsers } from "@/services/user";

export const dynamic = "force-dynamic";

export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
}
