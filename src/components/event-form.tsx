import React from "react";
import { EventType, GoalType, KorfballEvent } from "../types/events";
import generateId from "../utils/generate-id"
import { createEvent, getEvents } from "../api/event-service";

const players = ["Luciano", "Sam", "Katy", "Alex", "Maya", "Zara"];

type Props = {
  pendingCoords: { x: number; y: number };
  setPendingCoords: (v: null) => void;
  setEvents: (events: KorfballEvent[]) => void;
};

export default function EventForm({ pendingCoords, setPendingCoords, setEvents }: Props) {
  const [eventType, setEventType] = React.useState<EventType | "">("");
  const [player, setPlayer] = React.useState("");
  const [goalType, setGoalType] = React.useState<GoalType | "">("");

  const handleSave = () => {
    const base = {
      eventId: generateId(),
      timestamp: Date.now(),
      x: pendingCoords.x,
      y: pendingCoords.y,
      eventType,
    };

    let newEvent: KorfballEvent;

    if (eventType === EventType.Goal) {
      newEvent = {
        ...base,
        eventType: EventType.Goal,
        goalType: goalType as GoalType,
        scorer: player,
      };
    } else {
      newEvent = { ...base } as KorfballEvent;
    }

    createEvent(newEvent);
    setEvents(getEvents());
    setPendingCoords(null);
    setEventType("");
    setPlayer("");
    setGoalType("");
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 border rounded">
      <h3 className="font-bold mb-2">Add Event at ({pendingCoords.x}, {pendingCoords.y})</h3>

      <label className="block mb-2">
        Event Type:
        <select value={eventType} onChange={(e) => setEventType(e.target.value as EventType)} className="ml-2">
          <option value="">Select</option>
          {Object.values(EventType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Player:
        <select value={player} onChange={(e) => setPlayer(e.target.value)} className="ml-2">
          <option value="">Select</option>
          {players.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>

      {eventType === EventType.Goal && (
        <label className="block mb-2">
          Goal Type:
          <select value={goalType} onChange={(e) => setGoalType(e.target.value as GoalType)} className="ml-2">
            <option value="">Select</option>
            <option value="Penalty">Penalty</option>
            <option value="LongShot">Long Shot</option>
            <option value="MidShot">Mid Shot</option>
          </select>
        </label>
      )}

      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        disabled={!eventType || !player || (eventType === EventType.Goal && !goalType)}
        onClick={handleSave}
      >
        Save Event
      </button>
    </div>
  );
}
