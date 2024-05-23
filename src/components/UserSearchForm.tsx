"use client";

import { AuthUser, SearchUser } from "@/model/user";
import { useCallback, useEffect, useState } from "react";

import Avatar from "./Avatar";
import SearchUserCard from "./SearchUserCard";
import useSWR from "swr";

export default function UserSearchForm() {
  const [search, setSearch] = useState<string>("");
  const { data: users, error } = useSWR<SearchUser[]>("/api/user");

  console.log("users", users);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const user = await getSearchUser(search);
    // setUsers(user);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    // if (event.target.value === "") fetchUsers();
  };

  return (
    <form className="px-4 max-w-2xl" onSubmit={onSubmit}>
      <input
        type="search"
        id="from"
        name="from"
        placeholder="Search for a user..."
        required
        autoFocus
        value={search}
        onChange={onChange}
        className="text-black w-full border-2 border-gray-200 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:border-blue-500"
      />
      <ul className="grid gap-2 ">
        {users &&
          users.map((user) => (
            <li key={user.name}>
              <SearchUserCard user={user} />
            </li>
          ))}
      </ul>
    </form>
  );
}
