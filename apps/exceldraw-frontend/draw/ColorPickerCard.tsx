import React from "react";

interface ColorPickerCardProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const colors = ["#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ff9900", "#00ffff"];

export default function ColorPickerCard({ currentColor, onColorChange }: ColorPickerCardProps) {
  return (
    <div className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-900 p-4 rounded-xl shadow-xl border border-gray-700 flex flex-col gap-3 w-32">
      <div className="text-sm text-gray-300">Stroke</div>
      <div className="grid grid-cols-3 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            className="w-8 h-8 rounded-md border-2"
            style={{
              backgroundColor: color,
              borderColor: currentColor === color ? "white" : "transparent",
            }}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>
    </div>
  );
}
