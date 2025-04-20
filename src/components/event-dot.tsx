import React from "react";

type EventDotProps = {
  x: number;
  y: number;
  color: "green" | "red";
  title?: string;
  zIndex?: number;
};

const EventDot: React.FC<EventDotProps> = ({ x, y, color, title, zIndex = 40 }) => {
  return (
    <div
      className="absolute rounded-full border-2 border-white"
      style={{
        width: 20,
        height: 20,
        left: x - 10,
        top: y - 10,
        backgroundColor: color,
        zIndex,
      }}
      title={title}
    />
  );
};

export default EventDot;
