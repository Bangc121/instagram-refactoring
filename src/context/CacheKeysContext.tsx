import { createContext, useContext } from "react";

type CacheKeysValue = {
  postskey: string;
};
export const CacheKeysContext = createContext<CacheKeysValue>({
  postskey: "/api/post",
});

export const useCacheKeys = () => useContext(CacheKeysContext);
