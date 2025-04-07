import React from "react";
import { KorfballEvent } from "../types/events";

type Props = {
  events: KorfballEvent[];
  onImageClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  pendingCoords: { x: number; y: number } | null;
};

export default function Court({ events, onImageClick, pendingCoords }: Props) {
  return (
    <div className="w-full flex justify-center mb-6">
      <div className="relative w-[600px] h-auto">
        <img
          src="/korfball-court.png"
          alt="Korfball Court"
          onClick={onImageClick}
          className="w-full h-auto border-4 border-blue-400 cursor-crosshair"
        />
        {pendingCoords && (
          <div
            className="absolute bg-red-600 rounded-full w-4 h-4 border border-white z-50"
            style={{
              left: pendingCoords.x - 8,
              top: pendingCoords.y - 8,
            }}
          />
        )}
        {events.map((event) => (
          <div
            key={event.eventId}
            className="absolute bg-green-500 rounded-full w-4 h-4 border border-white z-40 hover:z-50"
            style={{ left: event.x - 8, top: event.y - 8 }}
            title={`[${new Date(event.timestamp).toLocaleTimeString()}] ${event.eventType} ${"scorer" in event ? "by " + event.scorer : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
