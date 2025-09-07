"use client";

import { useParams } from "next/navigation";
import { RoomCanvas } from "../../../components/RoomCanvas";

export default function CanvasPage() {
  const params = useParams();
  const roomId = Number(params.roomId); // convert string to number

  return <RoomCanvas roomId={roomId} />;
}
