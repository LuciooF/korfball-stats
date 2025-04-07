import React from "react";
import { KorfballEvent } from "../types/events";
import EventDot from "./event-dot";

type Props = {
  events: KorfballEvent[];
  onImageClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  pendingCoords: { x: number; y: number } | null;
};

export default function Court({ events, onImageClick, pendingCoords }: Props) {
  return (
    <div className="relative w-[600px] aspect-[2/3] bg-yellow-100 overflow-hidden">
  <img
    src="/korfball-court.png"
    alt="Korfball Court"
    onClick={onImageClick}
    className="absolute inset-0 w-full h-full border-4 border-blue-400 cursor-crosshair"
  />

  {pendingCoords && (
    <EventDot
      x={pendingCoords.x}
      y={pendingCoords.y}
      color="red"
      zIndex={50}
      title="Pending"
    />
  )}

  {events.map((event) => (
    <EventDot
      key={event.eventId}
      x={event.x}
      y={event.y}
      color="green"
      title={`[${new Date(event.timestamp).toLocaleTimeString()}] ${event.eventType}`}
    />
  ))}
</div>

  );
}
