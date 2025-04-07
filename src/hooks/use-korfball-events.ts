import { useEffect, useState } from "react";
import { getEvents } from "../api/event-service";
import { KorfballEvent } from "../types/events";

export const useKorfballEvents = () => {
  const [events, setEvents] = useState<KorfballEvent[]>([]);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  return { events, setEvents };
};
