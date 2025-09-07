"use client";

import { useEffect, useState } from "react";

import { Plus, Users, ArrowRight } from "lucide-react";
import { Button } from "@repo/ui/button";
import Input from "@repo/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import axios from "axios";
import { LoadingPage } from "../../components/Loading-page";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{
    username?: string;
    rooms?: { id: number; slug: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [createRoomName, setCreateRoomName] = useState("");
  const [joinRoomName, setJoinRoomName] = useState("");
  const url = process.env.NEXT_PUBLIC_HTTP_BACKEND as string;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}/checkUser`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setUser(response.data.message);
        setLoading(false);
      } catch (e) {
        router.push("/signin");
      }
    };

    fetchUser();
  }, []);
  async function getRoomId(slug: string) {
    const response = await axios.get(`${url}/room/${slug}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data.room.id;
  }
  const handleCreateRoom = async () => {
    if (createRoomName.trim()) {
      try {
        await axios.post(
          `${url}/room`,
          {
            name: createRoomName.trim(),
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const roomId = await getRoomId(createRoomName.trim());
        console.log(roomId);
        router.push(`/canvas/${roomId}`);
      } catch (e) {
        console.error("Failed to create room", e);
        alert("Failed to create room. It might already exist.");
      }
    }
  };
  const handleSignOut = () => {
    localStorage.removeItem("token")
    router.push("/") // Redirect to home page after sign out
  }
  const handleJoinRoom = async () => {
    if (joinRoomName.trim()) {
      const roomId = await getRoomId(joinRoomName.trim());
      router.push(`/canvas/${roomId}`);
    }
  };
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">RoomHub</span>
            </div>
            <span className="text-xl font-semibold text-white">
              Hello {user?.username}
            </span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors font-light" onClick={handleSignOut}>
            Sign Out
          </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Manage Your Rooms
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto text-pretty">
            Create new collaborative spaces or join existing rooms to connect
            with your team
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Create Room Card */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-blue-400" />
              </div>
              <CardTitle className="text-2xl text-white">Create Room</CardTitle>
              <CardDescription className="text-slate-400">
                Start a new collaborative space for your team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="create-room"
                  className="text-sm font-medium text-slate-300"
                >
                  Room Name
                </label>
                <Input
                  id="create-room"
                  type="text"
                  placeholder="Enter room name..."
                  value={createRoomName}
                  onChange={(e) => setCreateRoomName(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  onKeyPress={(e:any) => e.key === "Enter" && handleCreateRoom()}
                  required
                />
              </div>
              <Button
                onClick={handleCreateRoom}
                disabled={!createRoomName.trim()}
                className="w-full p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Room
                {/* <ArrowRight className="w-4 h-4 ml-2" /> */}
              </Button>
            </CardContent>
          </Card>

          {/* Join Room Card */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <CardTitle className="text-2xl text-white">Join Room</CardTitle>
              <CardDescription className="text-slate-400">
                Connect to an existing room using its name
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="join-room"
                  className="text-sm font-medium text-slate-300"
                >
                  Room Name
                </label>
                <Input
                  id="join-room"
                  type="text"
                  placeholder="Enter room name to join..."
                  value={joinRoomName}
                  onChange={(e) => setJoinRoomName(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-green-500 focus:ring-green-500/20"
                  onKeyPress={(e:any) => e.key === "Enter" && handleJoinRoom()}
                  required
                />
              </div>
              <Button
                onClick={handleJoinRoom}
                disabled={!joinRoomName.trim()}
                className="w-full p-2 rounded-md bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Room
                {/* <ArrowRight className="w-4 h-4 ml-2" /> */}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* User Rooms */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Your Rooms
          </h2>
          {user?.rooms && user.rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {user.rooms.map((room) => (
                <Card
                  key={room.id}
                  className="bg-slate-800/50 border-slate-700 flex flex-col"
                >
                  <CardHeader>
                    <CardTitle className="text-white">{room.slug}</CardTitle>
                    <CardDescription className="text-slate-400">
                      You are the admin of this room.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button
                      onClick={() => router.push(`/canvas/${room.id}`)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Enter Room
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-400">
              You haven't created any rooms yet.
            </p>
          )}
        </div>

        {/* Additional Features */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Room Features</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Real-time Collaboration
              </h3>
              <p className="text-slate-400 text-sm">
                Work together in real-time with your team members
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Easy Room Creation
              </h3>
              <p className="text-slate-400 text-sm">
                Create rooms instantly with just a name
              </p>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Quick Access
              </h3>
              <p className="text-slate-400 text-sm">
                Join existing rooms with simple name-based access
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
