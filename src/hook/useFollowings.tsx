import { User } from "@/model/user";
import { client } from "../../sanity/lib/client";
import useSWR from "swr";

const fetcher = (query: string) => client.fetch(query);

export function useFollowings(user: User) {
  const { data, error, isLoading } = useSWR(
    `*[_type == "user" && email == "${user.email}"]{
        followings[]->{ username, name, email, image }
      }[0]`,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}
