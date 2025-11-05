"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Canvas } from "./Canvas";
import axios from "axios";

export function RoomCanvas({ roomId }: { roomId: number }) {
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL as string;
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
    const url = process.env.NEXT_PUBLIC_HTTP_BACKEND as string;
const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
    }

    const fetchUser = async () => {
      try {
       
        const response = await axios.get(`${url}/checkUser`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
       
      } catch (e) {
        router.push("/signin");
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    if (socketRef.current) return; // Prevent duplicate connections
    
    const ws = new WebSocket(
      `${WS_URL}?token=${localStorage.getItem("token")}`
    );

    ws.onopen = () => {
      socketRef.current = ws;
      setIsConnected(true);
      ws.send(JSON.stringify({ type: "join_room", roomId }));
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed:", event);
      socketRef.current = null;
      setIsConnected(false);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [roomId]);

  if (!isConnected) {
    return <div>Connecting to the server...</div>;
  }

  return <Canvas roomId={roomId} socket={socketRef.current!} />;
}
