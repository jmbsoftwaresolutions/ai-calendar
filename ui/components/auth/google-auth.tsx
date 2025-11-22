"use client";
import { useEffect, useState } from "react";
import "@/lib/google-auth";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "./logout-button";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

export default function GoogleAuth({ clientId }: { clientId?: string }) {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  useEffect(() => {
    // Load Google Identity script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [supabase?.auth]);

  return (
    <>
      {user ? (
        <div className="flex items-center gap-4 mr-5">
          Hey, {user.user_metadata?.full_name || user.email}!
          {user.user_metadata?.avatar_url ? (
            <Image
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
          <div className="p-2 mr-5 text-md font-semibold">Sign In</div>
          <div
            id="g_id_onload"
            data-client_id={clientId}
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleGoogleCredentialResponse"
            data-auto_prompt="false"
            data-scope="email profile openid https://www.googleapis.com/auth/calendar.events"
          ></div>

          <div
            className="g_id_signin"
            data-type="icon"
            data-shape="rectangular"
            data-theme="filled_black"
            data-text="icon"
            data-size="large"
            data-logo_alignment="left"
          ></div>
        </>
      )}
    </>
  );
}
