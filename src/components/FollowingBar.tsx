"use client";

import "react-multi-carousel/lib/styles.css";

import Avatar from "./Avatar";
import { BeatLoader } from "react-spinners";
import Carousel from "react-multi-carousel";
import { User } from "@/model/user";
import { useFollowings } from "@/hook/useFollowings";
import useSWR from "swr";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
  },
};

type Props = {
  user: User;
};

export default function FollowingBar({ user }: Props) {
  const { data, isLoading, isError } = useSWR("/api/me");

  console.log(data);
  return (
    <div className="flex h-44 rounded-md overflow-hidden shadow-l hover:shadow-xl p-5 justify-center items-center">
      {isLoading ? (
        <BeatLoader color="#36d7b7" />
      ) : (
        <div className="w-full">
          {/* <Carousel responsive={responsive}>
            {data?.followings.map((following: User) => (
              <Avatar
                key={user.username}
                image={following.image}
                size="normal"
                highright
              />
            ))}
          </Carousel> */}
        </div>
      )}
    </div>
  );
}
