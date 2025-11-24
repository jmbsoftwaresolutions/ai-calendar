"use server";

import GoogleAuth from "../auth/google-auth";

export async function Header() {
  return (
    <header className="p-5 flex justify-end border-b-2 mb-10">
      <GoogleAuth callback={process.env.GOOGLE_OAUTH_CALLBACK_URL} />
    </header>
  );
}
