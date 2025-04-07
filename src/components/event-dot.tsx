import React from "react";

type EventDotProps = {
  x: number;
  y: number;
  color: "green" | "red";
  title?: string;
  zIndex?: number;
};

const EventDot: React.FC<EventDotProps> = ({ x, y, color, title, zIndex = 40 }) => {
    const bgColor = color === "green" ? "bg-green-500" : "bg-red-600";
  
    console.log(`Rendering ${color} dot at (${x}, ${y}) — zIndex ${zIndex}`);
  
    return (
      <div
        className={`absolute ${bgColor} rounded-full border-4 border-white`}
        style={{
          width: 20,
          height: 20,
          left: x - 10,
          top: y - 10,
          zIndex,
          outline: "2px solid black", // for debug
        }}
        title={title}
      />
    );
  };
  
  

export default EventDot;