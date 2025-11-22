"use server";

import GoogleAuth from "../auth/google-auth";

export async function Header() {
  return (
    <header className="p-5 flex justify-end border-b-2 mb-10">
      <GoogleAuth clientId={process.env.GOOGLE_OAUTH_CLIENT_ID} />
    </header>
  );
}
