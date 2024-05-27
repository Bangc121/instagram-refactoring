import { NextRequest, NextResponse } from "next/server";
import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from "@/services/post";

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;
  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const [username, query] = slug;
  console.log("username", username, query);
  let request = getPostsOf;
  if (query === "liked") {
    request = getLikedPostsOf;
  } else if (query === "bookmarks") {
    request = getSavedPostsOf;
  }

  return request(username).then((data) => NextResponse.json(data));
}
