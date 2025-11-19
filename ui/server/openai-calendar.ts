"use server";

import { createClient } from "@/lib/supabase/server";

export async function sendPrompt(
  input: string
): Promise<{ date?: string; error?: Error }> {
  const supabase = await createClient();

  const { data, error } = await supabase.functions.invoke("openai-calendar", {
    method: "POST",
    body: {
      query: input,
    },
  });

  if (error) {
    if (error) console.error("Error sending query:", error.message);

    return {
      error: { name: "Error", message: "Unexpected error occurred" },
    };
  } else {
    return { date: data };
  }
}
