"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton({
  returnUrl = "/auth/login",
}: {
  returnUrl?: string;
}) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(returnUrl);
    if (window?.location) window.location.reload();
  };

  return <Button onClick={logout}>Logout</Button>;
}
