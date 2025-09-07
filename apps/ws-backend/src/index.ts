import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocket, WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/index";

let wss: WebSocketServer;

const PORT = Number(process.env.PORT) || 8080;

if (process.env.NODE_ENV !== 'production') {
  console.log(PORT);
  wss = new WebSocketServer({ port: PORT });
} else {
  wss = new WebSocketServer({ port: PORT });
}


interface User {
  ws: WebSocket;
  userId: string;
  rooms: string[];
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !(decoded as JwtPayload).id) {
      return null;
    }
    return (decoded as JwtPayload).id;
  } catch {
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") ?? "";
  const userId = checkUser(token);
  if (!userId) {
    ws.close();
    return;
  }

  users.push({ userId, rooms: [], ws });

  ws.on("message", async function message(data) {
    const parsedData = JSON.parse(data.toString());

    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) return;
      user.rooms = user.rooms.filter((x) => x !== parsedData.roomId);
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      await prismaClient.chat.create({
        data: { roomId, message, userId },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({ type: "chat", message, roomId }));
        }
      });
    }

    if (parsedData.type === "updateChat") {
      const roomId = parsedData.roomId;
      const updatedMessage = parsedData.message;
      const shape = JSON.parse(updatedMessage).shape;

      const existingChat = await prismaClient.chat.findFirst({
        where: {
          roomId,
          message: { contains: `"id":"${shape.id}"` },
        },
      });

      if (existingChat) {
        await prismaClient.chat.update({
          where: { id: existingChat.id },
          data: { message: updatedMessage },
        });
      } else {
        await prismaClient.chat.create({
          data: { roomId, message: updatedMessage, userId },
        });
      }

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({ type: "updateChat", message: updatedMessage, roomId }));
        }
      });
    }

    if (parsedData.type === "deleteChat") {
      const roomId = parsedData.roomId;
      const shapeId = parsedData.shapeId;

      const existingChat = await prismaClient.chat.findFirst({
        where: {
          roomId,
          message: { contains: `"id":"${shapeId}"` },
        },
      });

      if (existingChat) {
        await prismaClient.chat.delete({ where: { id: existingChat.id } });
      }

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({ type: "deleteChat", shapeId, roomId }));
        }
      });
    }
  });
});
