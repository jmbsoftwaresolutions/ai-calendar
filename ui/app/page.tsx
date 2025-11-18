import { Header } from "@/components/ui/header";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-4 mt-10 mb-20">
        <h1 className="text-5xl">AI Calendar Demo</h1>
        {data?.claims ? <></> : <p className="mt-10">Sign in to get started</p>}
      </main>
    </>
  );
}
