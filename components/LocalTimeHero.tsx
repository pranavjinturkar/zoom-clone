"use client";

import { useEffect, useState } from "react";

type LocalClockSnapshot = {
  now: Date;
  timeZoneId: string;
  timeZoneName: string;
};

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "full",
});

const getTimeZoneName = (now: Date) => {
  const parts = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).formatToParts(now);

  return (
    parts.find((part) => part.type === "timeZoneName")?.value ?? "Local time"
  );
};

const getLocalClockSnapshot = (): LocalClockSnapshot => {
  const now = new Date();
  const timeZoneId =
    Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Your time zone";

  return {
    now,
    timeZoneId,
    timeZoneName: getTimeZoneName(now),
  };
};

const LocalTimeHero = () => {
  const [clock, setClock] = useState<LocalClockSnapshot | null>(null);

  useEffect(() => {
    let minuteIntervalId: number | undefined;
    let nextMinuteTimeoutId: number | undefined;

    const syncClock = () => {
      setClock(getLocalClockSnapshot());
    };

    syncClock();

    const millisecondsUntilNextMinute = 60_000 - (Date.now() % 60_000);

    nextMinuteTimeoutId = window.setTimeout(() => {
      syncClock();
      minuteIntervalId = window.setInterval(syncClock, 60_000);
    }, millisecondsUntilNextMinute);

    return () => {
      if (nextMinuteTimeoutId) {
        window.clearTimeout(nextMinuteTimeoutId);
      }

      if (minuteIntervalId) {
        window.clearInterval(minuteIntervalId);
      }
    };
  }, []);

  const localTime = clock ? timeFormatter.format(clock.now) : "--:--";
  const localDate = clock ? dateFormatter.format(clock.now) : "Loading local date";
  const timeZoneLabel = clock
    ? `${clock.timeZoneName} · ${clock.timeZoneId}`
    : "Syncing to your device";

  return (
    <div className="h-[280px] w-full rounded-[20px] bg-hero bg-cover">
      <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-9">
        <div className="flex flex-wrap items-center gap-3">
          <p className="glassmorphism rounded-full px-4 py-2 text-sm font-medium tracking-[0.2em] text-sky-3 uppercase">
            Local Time
          </p>
          <p className="rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm font-medium text-sky-2">
            {timeZoneLabel}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <time
            dateTime={clock?.now.toISOString()}
            aria-live="polite"
            className="text-4xl font-extrabold lg:text-6xl"
          >
            {localTime}
          </time>
          <p className="text-lg font-medium text-sky-1 lg:text-2xl">
            {localDate}
          </p>
          {/* <p className="text-sm text-sky-2">
            Synced to your device clock so the dashboard always matches your local time.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default LocalTimeHero;
