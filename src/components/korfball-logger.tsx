import React, { useState } from "react";
import Court from "./court";
import EventList from "./event-list";
import EventForm from "./event-form";
import { useKorfballEvents } from "../hooks/use-korfball-events";

export default function KorfballLogger() {
  const { events, setEvents } = useKorfballEvents();
  const [pendingCoords, setPendingCoords] = useState<{ x: number; y: number } | null>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
  
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;
  
    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);
  
    console.log("Clicked at:", x, y, "(scaled)");
    setPendingCoords({ x, y });
  };
  

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">KORFBALL LOGGER</h1>
      <EventList events={events} />
      <Court events={events} onImageClick={handleImageClick} pendingCoords={pendingCoords} />
      {pendingCoords && (
        <EventForm
          pendingCoords={pendingCoords}
          setPendingCoords={setPendingCoords}
          setEvents={setEvents}
        />
      )}
    </div>
  );
}
