"use server";

import { createClient } from "@/lib/supabase/server";
import { calendar_v3 } from "googleapis";
import Schema$CalendarListEntry = calendar_v3.Schema$CalendarListEntry;
import Schema$Event = calendar_v3.Schema$Event;

export async function getCalendars(): Promise<{
  list?: Schema$CalendarListEntry[];
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
  input: string
): Promise<{ event?: any; error?: Error }> {
  const supabase = await createClient();

  const { data, error } = await supabase.functions.invoke("openai-calendar", {
    method: "POST",
    body: {
      query: input,
    },
  });

  if (error) {
    if (error) console.error("Error sending query:", error);

    return {
      error: { name: "Error", message: "Unexpected error occurred" },
    };
  } else {
    return { event: data };
  }
}

export async function createEvent(
  calendarId: string,
  event: Schema$Event
): Promise<{
  htmlLink?: string;
  error?: Error;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase.functions.invoke("create-event", {
    method: "POST",
    body: {
      calendarId,
      event,
    },
  });

  if (error) {
    if (error) console.error("Error sending query:", error);

    return {
      error: { name: "Error", message: "Unexpected error occurred" },
    };
  } else {
    return { htmlLink: data };
  }
}
