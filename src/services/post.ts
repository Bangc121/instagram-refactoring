import { urlFor, urlForImage } from "../../sanity/lib/image";

import { SimplePost } from "@/model/post";
import { client } from "../../sanity/lib/client";
import user from "../../sanity/schemas/user";

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

export async function getFollowingPostOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}" || 
    author._ref in *[_type == "user" && username == "${username}"].followings[]._ref] | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(mapPosts);
}

export async function getPostById(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": image,
    "likes": likes[] -> username,
    comments[]{comment, "username": author->username, "image": author->image},
    "id": _id,
    "createdAt": _createdAt,
  }`
    )
    .then(mapPosts);
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"] | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[] -> username] | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && username == "${username}"].bookmarks[]._ref] | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    image: urlForImage(post.image),
  }));
}
