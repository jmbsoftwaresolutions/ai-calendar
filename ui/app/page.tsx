import { CalendarInput } from "@/components/calendar-input";
import { Header } from "@/components/ui/header";
import { createClient } from "@/lib/supabase/server";
import { getCalendars } from "@/server/openai-calendar";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const calendars = data?.claims ? await getCalendars() : { list: [] };
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-4 mt-10 mb-20">
        <h1 className="text-5xl">AI Calendar Demo</h1>

        {data?.claims ? (
          <>
            <p className="mt-10">
              Enter your event description and click submit to create it on your
              calendar!
            </p>
            <CalendarInput
              className="max-w-lg w-full mt-10"
              calendarList={calendars.list}
            />
          </>
        ) : (
          <>
            <p className="mt-10">
              This is a demo application that will take natural language input
              to create a event on your google calendar.
            </p>
            <p className="mt-10">
              You can describe the event in plain English, and the AI will
              generate the event on your calendar.
            </p>
            <p className="mt-10">
              Sign in to get started! This will give the application access to
              create events on your calendar!
            </p>
          </>
        )}
      </main>
    </>
  );
}
