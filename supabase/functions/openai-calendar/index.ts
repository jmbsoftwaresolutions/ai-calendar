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

  const systemPrompt = `You are an AI assistant that translates text into a google calendar event in JSON format. 
  Only respond with a JSON object with the following format:
  {
      summary: "<Event Title>",
      location: "<Event Location>",
      description: "<Event Description>",
      start: {
        dateTime: "<Event Start DateTime in ISO 8601 format>",
        timeZone: "America/New_York"
      },
      end: {
        dateTime: "<Event End DateTime in ISO 8601 format>",
        timeZone: "America/New_York"
      }
    }
  The user is going to provide text that describes an event they want to create.
  Your job is to extract the relevant information from the text and format it into the JSON object above.
  
  Guidelines:
  - Always respond with a single JSON object and nothing else.
  - Ensure dateTime fields are in ISO 8601 format.
  - Summarize the event in <Event Title>.
  - If location, description, or other fields are not provided in the text, omit them from the JSON object.
  - Use the "start" and "end" fields to indicate when the event begins and ends.
  - Use the "America/New_York" timezone for all dateTime fields.
  - If the text does not provide certain fields (like location, description, attendees, reminders), omit those fields from the JSON object.
  - Focus on extracting accurate start and end dateTime values from the text.
  - If the text does not specify an end time, assume the event lasts one hour.
  
  Date Extraction Rules:
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
    const response = chatCompletion.choices[0].message.content;

    console.log("OpenAI response:", response);

    const event = JSON.parse(response);

    console.log("Event:", event);

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
