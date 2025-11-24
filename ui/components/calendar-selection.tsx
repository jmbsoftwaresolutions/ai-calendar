"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { CheckCircleIcon } from "lucide-react";
import { calendar_v3 } from "googleapis";
import Schema$CalendarListEntry = calendar_v3.Schema$CalendarListEntry;

export function CalendarSelection({
  className,
  calendarList,
  onCalendarSelect,
  selectedCalendar,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  calendarList: Schema$CalendarListEntry[];
  onCalendarSelect: (calendar: Schema$CalendarListEntry) => void;
  selectedCalendar?: Schema$CalendarListEntry;
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Calendar</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          {calendarList.map((calendar) => (
            <div key={calendar.id} onClick={() => onCalendarSelect(calendar)}>
              {calendar.summary}
              {calendar.id == selectedCalendar?.id ? (
                <CheckCircleIcon className="inline float-end" />
              ) : (
                ""
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
