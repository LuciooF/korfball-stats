import { KorfballEvent } from "../types/events";

export default function EventList({ events }: { events: KorfballEvent[] }) {
  return (
    <div className="max-h-40 overflow-y-auto border p-2 mb-6">
      <h2 className="font-semibold mb-2">Scrollable list of added events</h2>
      <ul className="text-sm space-y-1">
        {events.map((e) => (
          <li key={e.eventId}>
            [{new Date(e.timestamp).toLocaleTimeString()}] {e.eventType} by {"scorer" in e ? e.scorer : ""} at ({e.x}, {e.y})
          </li>
        ))}
      </ul>
    </div>
  );
}
