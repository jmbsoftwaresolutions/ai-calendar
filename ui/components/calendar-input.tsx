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
import { sendPrompt } from "@/server/openai-calendar";
import { TextArea } from "./ui/textarea";
import { CalendarSelection } from "./calendar-selection";
export function CalendarInput({
  className,
  calendarList,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  calendarList?: any[];
}) {
  const [input, setInput] = useState("");
  const [calendar, setCalendar] = useState<any>(
    calendarList?.length === 1 ? calendarList[0] : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { date, error } = await sendPrompt(input, calendar.id);

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }
    alert(`Extracted date: ${JSON.stringify(date, null, 2)}`);
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
        </CardContent>
      </Card>
    </div>
  );
}
