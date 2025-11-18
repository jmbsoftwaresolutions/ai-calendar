"use server";
import { Suspense } from "react";
import { AuthButton } from "../auth/auth-button";

export async function Header() {
  return (
    <header className="p-5 flex justify-end border-b-2 mb-10">
      <AuthButton />
    </header>
  );
}
