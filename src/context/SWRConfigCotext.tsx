"use client";

import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigCotext({ children }: Props) {
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      {children}
    </SWRConfig>
  );
}