import { KorfballEvent } from "../types/events";

let events: KorfballEvent[] = [];

export const getEvents = () => [...events];

export const createEvent = (event: KorfballEvent) => {
  events.push(event);
};

export const removeEvent = (eventId: string) => {
  events = events.filter(e => e.eventId !== eventId);
};

export const clearEvents = () => {
  events = [];
};
