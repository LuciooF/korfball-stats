import React, { useState } from "react";
import Court from "./court";
import EventList from "./event-list";
import EventForm from "./event-form";
import { useKorfballEvents } from "../hooks/use-korfball-events";

export default function KorfballLogger() {
  const { events, setEvents } = useKorfballEvents();
  const [pendingCoords, setPendingCoords] = useState<{ x: number; y: number } | null>(null);

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
