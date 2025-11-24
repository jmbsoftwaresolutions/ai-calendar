import { CalendarInput } from "@/components/calendar-input";
import { CalendarSelection } from "@/components/calendar-selection";
import { Header } from "@/components/ui/header";
import { createClient } from "@/lib/supabase/server";
import { getCalendars } from "@/server/openai-calendar";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const calendars = await getCalendars();
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-4 mt-10 mb-20">
        <h1 className="text-5xl">AI Calendar Demo</h1>
        {data?.claims ? (
          <>
            <CalendarInput
              className="max-w-lg w-full mt-10"
              calendarList={calendars.list}
            />
          </>
        ) : (
          <p className="mt-10">Sign in to get started</p>
        )}
      </main>
    </>
  );
}
