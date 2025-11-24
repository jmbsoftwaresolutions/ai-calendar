// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { google } from "npm:googleapis";
import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "POST" },
    });
  }
  console.log("Request received for create-event function");
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response("Missing authorization header", { status: 401 });
  }
  // Create Supabase client
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    // Create client with Auth context of the user that called the function.
    // // This way your row-level-security (RLS) policies are applied.
    {
      global: {
        headers: { Authorization: authHeader! },
      },
    }
  );

  const token = authHeader.replace("Bearer ", "");
  const {
    data: { user },
    error: userError,
  } = await supabaseClient.auth.getUser(token);

  if (userError || !user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Retrieve Google access token from your database for this user
  const { data: googleAuthData, error } = await supabaseClient
    .from("user_google_tokens")
    .select("google_access_token, google_refresh_token")
    .eq("user_id", user.id)
    .single();

  if (error || !googleAuthData) {
    return new Response("Failed to retrieve Google auth data", { status: 500 });
  }

  const { calendarId, event } = await req.json();

  // Create authenticated Google Calendar client

  try {
    const oauth2Client = new google.auth.OAuth2(
      Deno.env.get("GOOGLE_CLIENT_ID"),
      Deno.env.get("GOOGLE_CLIENT_SECRET")
    );
    oauth2Client.setCredentials({
      access_token: googleAuthData.google_access_token,
      refresh_token: googleAuthData.google_refresh_token,
    });

    await oauth2Client.refreshAccessToken();

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const response = await calendar.events.insert({
      calendarId: calendarId,
      resource: event,
    });

    const eventCreated = response.data;
    console.log("Event created:", eventCreated);

    return new Response(response.data.htmlLink, {
      status: 200,
    });
  } catch (err) {
    console.error("Error fetching calendar events:", err);
    return new Response("Failed to fetch calendar events", { status: 500 });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:9010/functions/v1/calendar-test' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
