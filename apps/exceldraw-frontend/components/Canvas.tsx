import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { initDraw } from "../draw";
import Toolbar, { Tool } from "../draw/Toolbar";
import ColorPickerCard from "../draw/ColorPickerCard";

type Shape = import("../draw").Shape;

type DrawApi = {
  addShape: (shape: Shape) => void;
  updateShape: (shape: Shape) => void;
  cleanup: () => void;
};

export function Canvas({ roomId, socket }: { roomId: number; socket: WebSocket }) {
  const [currentTool, setCurrentTool] = useState<Tool>("rect");
  const [currentColor, setCurrentColor] = useState<string>("#ffffff"); // default white

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toolRef = useRef<Tool>(currentTool);
  const colorRef = useRef<string>(currentColor);
  const drawApiRef = useRef<DrawApi | null>(null);

  const [textInput, setTextInput] = useState<{
    x: number;
    y: number;
    visible: boolean;
  } | null>(null);

  useEffect(() => {
    toolRef.current = currentTool;
    if (currentTool !== "text") {
      setTextInput(null);
    }
  }, [currentTool]);

  useEffect(() => {
    colorRef.current = currentColor;
  }, [currentColor]);

  useEffect(() => {
    if (canvasRef.current && roomId && socket) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const handleStartTextEdit = (x: number, y: number) => {
        setTextInput({ x, y, visible: true });
      };

      const api = initDraw(
        ctx,
        canvas,
        roomId,
        socket,
        toolRef,
        colorRef,
        handleStartTextEdit
      );
      drawApiRef.current = api;

      return () => api.cleanup();
    }
  }, [roomId, socket]);

  const handleTextSubmit = (
    e: KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    const input = e.currentTarget;
    const text = input.value.trim();

    if (textInput && text) {
      const shape: Shape = {
        id: crypto.randomUUID(),
        type: "text",
        x: textInput.x,
        y: textInput.y,
        text,
        fontSize: 16,
        fontFamily: "Arial",
        color: currentColor,
      };
      drawApiRef.current?.addShape(shape);
    }

    setTextInput(null);
  };

  return (
    <div>
      <Toolbar currentTool={currentTool} onToolChange={setCurrentTool} />
      <ColorPickerCard currentColor={currentColor} onColorChange={setCurrentColor} />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ background: "#13171c", display: "block" }}
      ></canvas>
      {textInput?.visible && (
        <input
          type="text"
          autoFocus
          style={{
            position: "absolute",
            top: textInput.y - 8,
            left: textInput.x,
            background: "transparent",
            border: "1px solid #ccc",
            color: currentColor,
            font: "16px Arial",
            outline: "none",
            zIndex: 100,
          }}
          onBlur={handleTextSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTextSubmit(e);
            } else if (e.key === "Escape") {
              setTextInput(null);
            }
          }}
        />
      )}
    </div>
  );
}
