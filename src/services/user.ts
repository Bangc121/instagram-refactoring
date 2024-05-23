import { SearchUser } from "@/model/user";
import { client } from "../../sanity/lib/client";

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
    "following": count(followings),
    "followers": count(followers),
  }`
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
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
    "following": count(followings),
    "followers": count(followers),
    "posts": count(*[_type == "post" && author->username == ${username} ])
  }`
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
    }));
}
