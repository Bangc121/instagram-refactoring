import { SearchUser } from "@/model/user";
import { client } from "../../sanity/lib/client";
import { revalidatePath } from "next/cache";

type OAuthuser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({ username, id, email, name, image }: OAuthuser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    name,
    image,
    followings: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(`*[_type == "user" && username == "${username}"]{
    ...,
    "id": _id,
    followings[]->{username, image},
    followers[]->{username, image},
    "bookmarks": bookmarks[]->_id
  }[0]`);
}

export async function getAllUser() {
  return client.fetch(`*[_type == "user"]{
    ...,
    "followings": count(followings),
    "followers": count(followers),
  }`);
}

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}*" || username match "${keyword}*")`
    : "";

  return client
    .fetch(
      `*[_type == "user" ${query}]{
    ...,
    "followings": count(followings),
    "followers": count(followers),
  }`
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        followings: user.followings ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
    ...,
    "id": _id,
    "followings": count(followings),
    "followers": count(followers),
    "posts": count(*[_type == "post" && author->username == ${username} ])
  }`,
      undefined,
      { tag: `user-${username}` }
    )
    .then((user) => ({
      ...user,
      followings: user.followings ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref == "${postId}"]`])
    .commit();
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) =>
      user
        .setIfMissing({ followings: [] })
        .append("followings", [{ _ref: targetId, _type: "reference" }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("followers", [{ _ref: myId, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) => user.unset([`followings[_ref == "${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref == "${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
