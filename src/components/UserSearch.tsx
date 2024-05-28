"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import GridSpinner from "./ui/GridSpinner";
import { SearchUser } from "@/model/user";
import UserCard from "./UserCard";
import useDebounce from "@/hooks/useDebounce";
import useSWR from "swr";

export default function UserSearch() {
  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword, 1000);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          type="search"
          id="from"
          name="from"
          placeholder="Search for a user..."
          required
          autoFocus
          value={keyword}
          onChange={onChange}
          className="text-black w-full border-2 border-gray-200 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:border-blue-500"
        />
        {error && <p>Error</p>}
        {isLoading && <GridSpinner />}
        {!isLoading && !error && users?.length === 0 && (
          <p>찾는 사용자가 없음</p>
        )}
        <ul className="w-full">
          {users &&
            users.map((user) => (
              <li key={user.username}>
                <UserCard user={user} />
              </li>
            ))}
        </ul>
      </form>
    </section>
  );
}
