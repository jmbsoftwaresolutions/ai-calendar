"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { createEvent } from "@/server/openai-calendar";
import { TextArea } from "./ui/textarea";
import { CalendarSelection } from "./calendar-selection";
import { calendar_v3 } from "googleapis";
import Schema$CalendarListEntry = calendar_v3.Schema$CalendarListEntry;

export function CalendarInput({
  className,
  calendarList,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  calendarList?: Schema$CalendarListEntry[];
}) {
  const [input, setInput] = useState("");
  const [calendar, setCalendar] = useState<
    Schema$CalendarListEntry | undefined
  >(calendarList?.length === 1 ? calendarList[0] : undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [eventLink, setEventLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // const { event, error } = await sendPrompt(input);

    const event = {
      summary: "Test Event",
      location: "444 Test St, Test City, TS 12345",
      description: "Test Event for ai-calendar.",
      start: {
        dateTime: "2025-11-28T09:00:00-07:00",
        timeZone: "America/New_York",
      },
      end: {
        dateTime: "2025-11-28T17:00:00-07:00",
        timeZone: "America/New_York",
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      attendees: [
        { email: "james.bales@hotmail.com" },
        { email: "jmbsoftwaresolutions@outlook.com" },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    if (calendar?.id) {
      const { htmlLink, error } = await createEvent(calendar?.id, event);

      console.log("Event link received:", htmlLink);

      if (error) setError(error.message);
      else setEventLink(htmlLink!);
    }
    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <CalendarSelection
        calendarList={calendarList!}
        onCalendarSelect={(calendar) => setCalendar(calendar)}
        selectedCalendar={calendar}
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">AI Calendar</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="input">Input</Label>
                <TextArea
                  id="input"
                  rows={5}
                  required
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !calendar}
              >
                {isLoading ? "Processing..." : "Submit"}
              </Button>
            </div>
          </form>
          <a href={eventLink || ""} target="_blank" rel="noopener noreferrer">
            {eventLink && (
              <p className="mt-4 text-blue-500 underline">View Event Link</p>
            )}
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
