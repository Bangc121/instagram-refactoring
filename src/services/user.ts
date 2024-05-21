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
