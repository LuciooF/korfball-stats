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
    <div className="w-full flex justify-center mb-6">
      {/* RELATIVE container */}
      <div className="relative w-[600px] aspect-[2/3] bg-yellow-100 overflow-hidden">
        {/* The ACTUAL image */}
        <img
          src="/korfball-court.png"
          alt="Korfball Court"
          onClick={onImageClick}
          className="w-full h-full object-cover"
          style={{ position: "relative", zIndex: 0 }}
        />

        {/* Dot layer */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
          {pendingCoords && (
            <EventDot
              x={pendingCoords.x}
              y={pendingCoords.y}
              color="red"
              zIndex={100}
              title="Pending"
            />
          )}

          {events.map((event) => (
            <EventDot
              key={event.eventId}
              x={event.x}
              y={event.y}
              color="green"
              zIndex={90}
              title={`[${new Date(event.timestamp).toLocaleTimeString()}] ${event.eventType}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
