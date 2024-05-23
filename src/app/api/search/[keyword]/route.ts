import { NextRequest, NextResponse } from "next/server";

import { searchUsers } from "@/services/user";

type Context = {
  params: {
    keyword: string;
  };
};

export async function GET(_: NextRequest, context: Context) {
  const keyword = context.params.keyword;
  return searchUsers(keyword).then((data) => NextResponse.json(data));
}
