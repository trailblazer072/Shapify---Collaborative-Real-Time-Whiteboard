import React from "react";
import { Square, Circle, Minus, Type, Move, Eraser } from "lucide-react";

export type Tool = "rect" | "circle" | "line" | "text" | "move" | "eraser";

interface ToolbarProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
}

const tools: { name: Tool; icon: React.ElementType }[] = [
  { name: "move", icon: Move },
  { name: "rect", icon: Square },
  { name: "circle", icon: Circle },
  { name: "line", icon: Minus },
  { name: "text", icon: Type },
  { name: "eraser", icon: Eraser }, // ✅ added eraser button
];

export default function Toolbar({ currentTool, onToolChange }: ToolbarProps) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-800 p-2 rounded-lg shadow-xl border border-gray-700 flex items-center gap-2">
      {tools.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => onToolChange(name)}
          className={`w-12 h-12 flex items-center justify-center rounded-md transition-colors ${
            currentTool === name
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          aria-label={`Select ${name} tool`}
          title={name.charAt(0).toUpperCase() + name.slice(1)}
        >
          <Icon className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
}
