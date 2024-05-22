import { urlFor, urlForImage } from "../../sanity/lib/image";

import { SimplePost } from "@/model/post";
import { client } from "../../sanity/lib/client";

const simplePostProjection = `
...,
"username": author->username,
"userImage": author->image,
"image": image,
"likes": likes[] -> username,
"text": comments[0].comment,
"comments": count(comments),
"id": _id,
"createdAt": _createdAt,`;

export function getFollowingPostOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}" || 
    author._ref in *[_type == "user" && username == "${username}"].followings[]._ref] | order(_createdAt desc){${simplePostProjection}}`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({
        ...post,
        image: urlForImage(post.image),
      }))
    );
}
