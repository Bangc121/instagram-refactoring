import { urlFor, urlForImage } from "../../sanity/lib/image";

import { SanityImageAssetDocument } from "next-sanity";
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

export async function getFollowingPostOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}" || 
    author._ref in *[_type == "user" && username == "${username}"].followings[]._ref] | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(
      (posts) =>
        posts &&
        posts.length > 0 &&
        posts.map((post: SimplePost) => ({
          ...post,
          likes: post.likes ?? [],
          image: urlForImage(post.image),
        }))
    );
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
    .then((post: SimplePost) => ({
      ...post,
      likes: post.likes ?? [],
      image: urlForImage(post.image),
    }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"] | order(_createdAt desc){...,
        "username": author->username,
        "userImage": author->image,
        "image": image,
        "likes": likes[] -> username,
        "text": comments[0].comment,
        "comments": count(comments),
        "id": _id,
        "createdAt": _createdAt,}`
    )
    .then(
      (posts) =>
        posts &&
        posts.length > 0 &&
        posts.map((post: SimplePost) => ({
          ...post,
          likes: post.likes ?? [],
          image: urlForImage(post.image),
        }))
    );
}

export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[] -> username] | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(
      (posts) =>
        posts &&
        posts.length > 0 &&
        posts.map((post: SimplePost) => ({
          ...post,
          likes: post.likes ?? [],
          image: urlForImage(post.image),
        }))
    );
}

export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && username == "${username}"].bookmarks[]._ref] | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(
      (posts) =>
        posts &&
        posts.length > 0 &&
        posts.map((post: SimplePost) => ({
          ...post,
          likes: post.likes ?? [],
          image: urlForImage(post.image),
        }))
    );
}

async function mapPosts(posts: SimplePost[]) {
  return (
    posts &&
    posts.length > 0 &&
    posts.map((post: SimplePost) => ({
      ...post,
      likes: post.likes ?? [],
      image: urlForImage(post.image),
    }))
  );
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append("likes", [
      {
        _ref: userId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function unlikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref == "${userId}"]`])
    .commit();
}

export async function addComment(
  postId: string,
  userId: string,
  comment: string
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        comment,
        author: {
          _ref: userId,
          _type: "reference",
        },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, text: string, file: File) {
  return client.assets
    .upload("image", file, {
      contentType: file.type,
      filename: file.name,
    })
    .then((imageAsset: SanityImageAssetDocument) => {
      console.log("imageAsset", imageAsset);
      return client.create(
        {
          _type: "post",
          author: { _ref: userId },
          image: {
            asset: { _ref: imageAsset._id },
          },
          comments: [
            {
              comment: text,
              author: { _ref: userId, _type: "reference" },
            },
          ],
          likes: [],
        },
        {
          autoGenerateArrayKeys: true,
        }
      );
    });
}
