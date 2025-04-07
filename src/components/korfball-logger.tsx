import React, { useState, useEffect } from "react";
import { EventType, GoalType, KorfballEvent } from "../types/events";
import { getEvents, createEvent } from "../api/event-service";

const generateId = () => Math.random().toString(36).substring(2, 9);

const players = ["Luciano", "Sam", "Katy", "Alex", "Maya", "Zara"];

export default function KorfballLogger() {
  const [events, setEvents] = useState<KorfballEvent[]>([]);
  const [pendingCoords, setPendingCoords] = useState<{ x: number; y: number } | null>(null);
  const [eventType, setEventType] = useState<EventType | "">("");
  const [player, setPlayer] = useState<string>("");
  const [goalType, setGoalType] = useState<GoalType | "">("");

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    console.log("Clicked at:", x, y);
    setPendingCoords({ x, y });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">KORFBALL LOGGER</h1>

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

      <div className="w-full flex justify-center mb-6">
      <div className="relative w-[600px] h-auto">

  <img
  src="/korfball-court.png"
  alt="Korfball Court"
  onClick={handleImageClick}
  className="w-full h-auto border-4 border-blue-400 cursor-crosshair"
/>


          {/* Pending red dot */}
          {pendingCoords && (
            <div
              className="absolute bg-red-600 rounded-full w-4 h-4 border border-white z-50"
              style={{
                left: pendingCoords.x - 8,
                top: pendingCoords.y - 8,
              }}
            ></div>
          )}

          {/* Saved green dots */}
          {events.map((event) => (
            <div
              key={event.eventId}
              className="absolute bg-green-500 rounded-full w-4 h-4 border border-white z-40 hover:z-50"
              style={{ left: event.x - 8, top: event.y - 8 }}
              title={`[${new Date(event.timestamp).toLocaleTimeString()}] ${event.eventType} ${"scorer" in event ? "by " + event.scorer : ""}`}
            ></div>
          ))}
        </div>
      </div>

      {pendingCoords && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="font-bold mb-2">
            Add Event at ({pendingCoords.x}, {pendingCoords.y})
          </h3>

          <label className="block mb-2">
            Event Type:
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value as EventType)}
              className="ml-2"
            >
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
            <select
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
              className="ml-2"
            >
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
              <select
                value={goalType}
                onChange={(e) =>
                  setGoalType(e.target.value as GoalType)
                }
                className="ml-2"
              >
                <option value="">Select</option>
                <option value="Penalty">Penalty</option>
                <option value="LongShot">Long Shot</option>
                <option value="MidShot">Mid Shot</option>
              </select>
            </label>
          )}

          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={
              !eventType ||
              !player ||
              (eventType === EventType.Goal && !goalType)
            }
            onClick={() => {
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
                newEvent = {
                  ...base,
                } as KorfballEvent;
              }

              createEvent(newEvent);
              setEvents(getEvents());
              setPendingCoords(null);
              setEventType("");
              setPlayer("");
              setGoalType("");
            }}
          >
            Save Event
          </button>
        </div>
      )}
    </div>
  );
}
