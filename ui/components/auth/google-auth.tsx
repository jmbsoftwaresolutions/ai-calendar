"use client";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "./logout-button";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

export default function GoogleAuth({ callback }: { callback?: string }) {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      console.log("GoogleAuth user:", data.user);
    });
  }, [supabase?.auth]);

  const handlelogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes:
          "openid, email, profile, https://www.googleapis.com/auth/calendar.events, https://www.googleapis.com/auth/calendar.readonly",
        redirectTo: callback,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  return (
    <>
      {user ? (
        <div className="flex items-center gap-4 mr-5">
          Hey, {user.user_metadata?.full_name || user.email}!
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata?.avatar_url}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            ""
          )}
          <LogoutButton returnUrl="/" />
        </div>
      ) : (
        <>
          <button onClick={handlelogin}>
            <Image
              src="/images/google_login.svg"
              alt="Google Login"
              width={150}
              height={150}
            />
          </button>
        </>
      )}
    </>
  );
}
