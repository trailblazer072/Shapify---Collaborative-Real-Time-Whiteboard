import axios from "axios";

import { Tool } from "./Toolbar";

export type Shape =
  | {
      id: string;
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      color?: string;
    }
  | {
      id: string;
      type: "circle";
      x: number;
      y: number;
      radius: number;
      color?: string;
    }
  | {
      id: string;
      type: "line";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color?: string;
    }
  | {
      id: string;
      type: "text";
      x: number;
      y: number;
      text: string;
      fontSize: number;
      fontFamily: string;
      color?: string;
    };

export function initDraw(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  roomId: number,
  socket: WebSocket,
  toolRef: { current: Tool },
  colorRef: { current: string },
  onStartTextEdit: (x: number, y: number) => void
) {
  let existingShapes: Shape[] = [];
  
  // --- helpers
  const addShape = (shape: Shape) => {
    existingShapes.push(shape);
    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId,
      })
    );
    clearCanvas(existingShapes, ctx, canvas);
  };

  const updateShape = (shape: Shape) => {
    const index = existingShapes.findIndex((s) => s.id === shape.id);
    if (index > -1) {
      existingShapes[index] = shape;
      socket.send(
        JSON.stringify({
          type: "updateChat",
          message: JSON.stringify({ shape }),
          roomId,
        })
      );
      clearCanvas(existingShapes, ctx, canvas);
    }
  };

  const deleteShape = (shape: Shape) => {
    existingShapes = existingShapes.filter((s) => s.id !== shape.id);
    socket.send(
      JSON.stringify({
        type: "deleteChat",
        shapeId: shape.id,
        roomId,
      })
    );
    clearCanvas(existingShapes, ctx, canvas);
  };

  // --- handle socket messages
  const onSocketMessage = (event: MessageEvent) => {
    const parsedData = JSON.parse(event.data);

    if (parsedData.type === "chat") {
      const shapeData = JSON.parse(parsedData.message).shape as Shape;
      if (shapeData) {
        const index = existingShapes.findIndex((s) => s.id === shapeData.id);
        if (index > -1) existingShapes[index] = shapeData;
        else existingShapes.push(shapeData);
        clearCanvas(existingShapes, ctx, canvas);
      }
    }

    if (parsedData.type === "updateChat") {
      const shapeData = JSON.parse(parsedData.message).shape as Shape;
      if (shapeData) {
        const index = existingShapes.findIndex((s) => s.id === shapeData.id);
        if (index > -1) existingShapes[index] = shapeData;
        else existingShapes.push(shapeData);
        clearCanvas(existingShapes, ctx, canvas);
      }
    }

    if (parsedData.type === "deleteChat") {
      existingShapes = existingShapes.filter(
        (s) => s.id !== parsedData.shapeId
      );
      clearCanvas(existingShapes, ctx, canvas);
    }
  };

  getExistingShapes(roomId).then((shapes) => {
    existingShapes = shapes;
    clearCanvas(existingShapes, ctx, canvas);
  });

  socket.addEventListener("message", onSocketMessage);

  // --- state vars
  let isDrawing = false;
  let isDragging = false;
  let selectedShape: Shape | null = null;
  let startX = 0;
  let startY = 0;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  // --- events
  const onMouseDown = (e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    startX = mouseX;
    startY = mouseY;

    if (toolRef.current === "text") {
      onStartTextEdit(mouseX, mouseY);
      return;
    }

    if (toolRef.current === "eraser") {
      const target = getShapeAtPosition(mouseX, mouseY, existingShapes, ctx);
      if (target) deleteShape(target);
      return;
    }

    if (toolRef.current === "move") {
      selectedShape = getShapeAtPosition(mouseX, mouseY, existingShapes, ctx);
      if (selectedShape) {
        isDragging = true;
        document.body.style.cursor = "grabbing";
        switch (selectedShape.type) {
          case "rect":
          case "circle":
          case "text":
            dragOffsetX = mouseX - selectedShape.x;
            dragOffsetY = mouseY - selectedShape.y;
            break;
          case "line":
            dragOffsetX = mouseX - selectedShape.x1;
            dragOffsetY = mouseY - selectedShape.y1;
            break;
        }
      }
    } else {
      isDrawing = true;
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    if (isDragging && selectedShape) updateShape(selectedShape);

    isDrawing = false;
    isDragging = false;
    selectedShape = null;
    document.body.style.cursor = "default";

    if (toolRef.current === "text" || toolRef.current === "move") return;

    const endX = e.clientX;
    const endY = e.clientY;

    let shape: Shape | undefined;
    const id = crypto.randomUUID();

    switch (toolRef.current) {
      case "rect":
        shape = {
          id,
          type: "rect",
          x: startX,
          y: startY,
          width: endX - startX,
          height: endY - startY,
          color: colorRef.current,
        };
        break;
      case "circle":
        shape = {
          id,
          type: "circle",
          x: startX,
          y: startY,
          radius: Math.sqrt(
            Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
          ),
          color: colorRef.current,
        };
        break;
      case "line":
        shape = {
          id,
          type: "line",
          x1: startX,
          y1: startY,
          x2: endX,
          y2: endY,
          color: colorRef.current,
        };
        break;
    }

    if (shape) addShape(shape);
  };

  const onMouseMove = (e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    if (toolRef.current === "move" && !isDragging) {
      const hoveredShape = getShapeAtPosition(mouseX, mouseY, existingShapes, ctx);
      document.body.style.cursor = hoveredShape ? "grab" : "default";
    }

    if (isDragging && selectedShape) {
      switch (selectedShape.type) {
        case "rect":
        case "circle":
        case "text":
          selectedShape.x = mouseX - dragOffsetX;
          selectedShape.y = mouseY - dragOffsetY;
          break;
        case "line":
          const dx = mouseX - dragOffsetX - selectedShape.x1;
          const dy = mouseY - dragOffsetY - selectedShape.y1;
          selectedShape.x1 += dx;
          selectedShape.y1 += dy;
          selectedShape.x2 += dx;
          selectedShape.y2 += dy;
          break;
      }
      clearCanvas(existingShapes, ctx, canvas);
    } else if (isDrawing) {
      clearCanvas(existingShapes, ctx, canvas);

      ctx.strokeStyle = colorRef.current;

      switch (toolRef.current) {
        case "rect":
          ctx.strokeRect(startX, startY, mouseX - startX, mouseY - startY);
          break;
        case "circle":
          ctx.beginPath();
          ctx.arc(
            startX,
            startY,
            Math.sqrt(Math.pow(mouseX - startX, 2) + Math.pow(mouseY - startY, 2)),
            0,
            2 * Math.PI
          );
          ctx.stroke();
          break;
        case "line":
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
          break;
      }
    }
  };

  // --- listeners
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mousemove", onMouseMove);

  const cleanup = () => {
    canvas.removeEventListener("mousedown", onMouseDown);
    canvas.removeEventListener("mouseup", onMouseUp);
    canvas.removeEventListener("mousemove", onMouseMove);
    socket.removeEventListener("message", onSocketMessage);
  };

  return { addShape, updateShape, cleanup };
}

// ---------------- helper functions ----------------
function isPointInShape(
  x: number,
  y: number,
  shape: Shape,
  ctx: CanvasRenderingContext2D
): boolean {
  switch (shape.type) {
    case "rect": {
      const x1 = Math.min(shape.x, shape.x + shape.width);
      const x2 = Math.max(shape.x, shape.x + shape.width);
      const y1 = Math.min(shape.y, shape.y + shape.height);
      const y2 = Math.max(shape.y, shape.y + shape.height);
      return x >= x1 && x <= x2 && y >= y1 && y <= y2;
    }
    case "circle":
      return Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2) <= shape.radius;
    case "line": {
      const { x1, y1, x2, y2 } = shape;
      const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
      if (l2 === 0) return Math.sqrt((x - x1) ** 2 + (y - y1) ** 2) < 5;
      let t = ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / l2;
      t = Math.max(0, Math.min(1, t));
      const closestX = x1 + t * (x2 - x1);
      const closestY = y1 + t * (y2 - y1);
      return Math.sqrt((x - closestX) ** 2 + (y - closestY) ** 2) < 5;
    }
    case "text": {
      ctx.font = `${shape.fontSize}px ${shape.fontFamily}`;
      const metrics = ctx.measureText(shape.text);
      const width = metrics.width;
      const height = shape.fontSize;
      return (
        x >= shape.x &&
        x <= shape.x + width &&
        y >= shape.y - height &&
        y <= shape.y
      );
    }
    default:
      return false;
  }
}

function getShapeAtPosition(
  x: number,
  y: number,
  shapes: Shape[],
  ctx: CanvasRenderingContext2D
): Shape | null {
  for (let i = shapes.length - 1; i >= 0; i--) {
    const shape = shapes[i];
    if (shape && isPointInShape(x, y, shape, ctx)) return shape;
  }
  return null;
}

function clearCanvas(
  existingShapes: Shape[],
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  existingShapes.forEach((shape) => {
    switch (shape.type) {
      case "rect":
        ctx.strokeStyle = shape.color || "white";
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        break;
      case "circle":
        ctx.strokeStyle = shape.color || "white";
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case "line":
        ctx.strokeStyle = shape.color || "white";
        ctx.beginPath();
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        ctx.stroke();
        break;
      case "text":
        ctx.fillStyle = shape.color || "white";
        ctx.font = `${shape.fontSize}px ${shape.fontFamily}`;
        ctx.fillText(shape.text, shape.x, shape.y);
        break;
    }
  });
}

async function getExistingShapes(roomId: number): Promise<Shape[]> {
  const HTTP_BACKEND = process.env.NEXT_PUBLIC_HTTP_BACKEND as string;
  try {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return res.data.messages
      .map((x: { message: string }) => {
        try {
          const data = JSON.parse(x.message);
          if (data.shape && !data.shape.id) {
            data.shape.id = crypto.randomUUID();
          }
          return data.shape;
        } catch {
          return null;
        }
      })
      .filter((s:any): s is Shape => !!s);
  } catch (err) {
    console.error("Failed to get existing shapes:", err);
    return [];
  }
}


