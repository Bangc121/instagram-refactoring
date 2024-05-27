import type { Metadata } from "next";
import Signin from "@/components/Signin";
import { authOptions } from "@/lib/auth";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Instagram | Signin",
  description: "SignUp or Signin to Instagram",
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};
export default async function SigninPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  console.log("session", session);
  if (session) {
    redirect("/");
  }

  console.log("callbackUrl", callbackUrl);

  const providers = (await getProviders()) ?? {};
  return (
    <section className="flex justify-center mt-24">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
