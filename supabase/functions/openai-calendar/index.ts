// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "POST" },
    });
  }

  const { query } = await req.json();

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  const systemPrompt = `You are an AI assistant that translates text into a date. 
  Only respond with the date in ISO format.
  If the text does not contain a date, respond with "null".
  If the user gives a day of the week, respond with the next occurrence of that day.
  If the user gives a date that has already passed this year, respond with that date next year.
  If the text contains multiple dates, respond with the first date mentioned.
  If the text is ambiguous, make your best guess based on current date.
  If the user gives a date that is "next <day of week>", respond with the occurrence in the next week.
  If the user gives a date that is "this <day of week>", respond with the occurrence in the current week.
  If the user gives a date but does not specify a year, assume the current year unless that date has already passed.
  If the user gives a quarter (e.g., "next quarter"), respond with a date corresponding to that quarter.
  If the user gives a holiday (e.g., "Christmas"), respond with the date of that holiday in the current year or next year if it has already passed.
  Today's date is ${new Date().toISOString().split("T")[0]}.
  
  `;

  /*
    const event = {
      summary: "Google I/O 2015",
      location: "800 Howard St., San Francisco, CA 94103",
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: "2015-05-28T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2015-05-28T17:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      attendees: [
        { email: "lpage@example.com" },
        { email: "sbrin@example.com" },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };
    */

  // Documentation here: https://github.com/openai/openai-node
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: query },
    ],
    // Choose model from here: https://platform.openai.com/docs/models
    model: "gpt-3.5-turbo",
    stream: false,
    temperature: 0,
  });

  console.log("Prompt received:", query);

  try {
    //Ensure it's valid JSON
    const event = JSON.parse(chatCompletion.choices[0].message.content);

    console.log("Event sent:", event);

    return new Response(JSON.stringify(event), {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error processing OpenAI response:", error);
    return new Response("Error processing request", { status: 500 });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:5000/functions/v1/openai-calendar' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
