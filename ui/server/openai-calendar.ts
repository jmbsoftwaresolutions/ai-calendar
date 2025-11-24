"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCalendars(): Promise<{
  list?: any[];
  error?: Error;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase.functions.invoke("get-calendars", {
    method: "GET",
  });

  if (error) {
    if (error) console.error("Error sending query:", error);

    return {
      error: { name: "Error", message: "Unexpected error occurred" },
    };
  } else {
    return { list: data };
  }
}

export async function sendPrompt(
  input: string,
  calendarId: string
): Promise<{ date?: string; error?: Error }> {
  const supabase = await createClient();

  const { data, error } = await supabase.functions.invoke("openai-calendar", {
    method: "POST",
    body: {
      query: input,
      calendarId: calendarId,
    },
  });

  if (error) {
    if (error) console.error("Error sending query:", error);

    return {
      error: { name: "Error", message: "Unexpected error occurred" },
    };
  } else {
    return { date: data };
  }
}
