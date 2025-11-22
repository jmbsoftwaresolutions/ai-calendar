"use client";
// utils/googleAuth.ts
import { createClient } from "./supabase/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleGoogleCredentialResponse(response: any) {
  const supabase = createClient();

  // response.credential contains the JWT from Google

  // Exchange the credential with Supabase
  supabase.auth
    .signInWithIdToken({
      provider: "google",
      token: response.credential,
    })
    .then(({ error }) => {
      if (error) {
        console.error("Supabase sign-in error:", error.message);
      } else {
        if (window?.location) window.location.reload();
      }
    });
}

// Attach to global scope
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).handleGoogleCredentialResponse =
    handleGoogleCredentialResponse;
}
