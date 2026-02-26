import React from "react";
import { Metadata } from "next";
import { LoginClient } from "./_components/client";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/action/session";

export const metadata: Metadata = { title: "Register" };

const LoginPage = async () => {
  const session = await getSession();

  if (session) {
    redirect(`/?fromUrl=login`);
  }
  return (
    <div className="bg-white h-screen w-screen flex items-center justify-center">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(#000000_1px,#ffffff_1px)] bg-size-[20px_20px] " />
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(125%_125%_at_50%_50%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,1)_60%)]" />
      <LoginClient />
    </div>
  );
};

export default LoginPage;
