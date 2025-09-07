import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import middleware from "./middleware";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SigninSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/index";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedInput = CreateUserSchema.safeParse(req.body);

  if (!parsedInput.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsedInput.error.flatten().fieldErrors,
    });
  }

  try {
    const { username, password } = parsedInput.data;

    // hash the password and save the user to a database.
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    console.log(`User signed up: ${username}`);

    //signing the user in
    const token = jwt.sign({ id: user.id.toString() }, JWT_SECRET);

    res.json({
      token: token,
      message: "User signed up & signed in successfully",
    });
  } catch (e) {
    res.json({
      message: "Error signing up user",
      error: e,
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedInput = SigninSchema.safeParse(req.body);

  if (!parsedInput.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsedInput.error.flatten().fieldErrors,
    });
  }

  try {
    const { username, password } = parsedInput.data;
    // In a real app, you would verify credentials
    const user = await prismaClient.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          id: user.id.toString(),
        },
        JWT_SECRET
      );
      return res.status(200).json({
        message: "Signed in successfully",
        token: token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect email or password.",
      });
      return;
    }
  } catch (e) {
    res.status(500).json({
      message: "Internal Error",
    });
  }
});

app.get("/verify", middleware, (req, res) => {
  // The middleware already handles token verification.
  // If this point is reached, the token is valid.
  // @ts-ignore
  res.status(200).json({ message: "User verified", userId: req.userId });
});

app.post("/room", middleware, async (req, res) => {
  const parsedInput = CreateRoomSchema.safeParse(req.body);

  if (!parsedInput.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsedInput.error.flatten().fieldErrors,
    });
  }
  //@ts-ignore
  console.log("User ID from middleware:", req.userId);
  try {
    //@ts-ignore
    const userId = req.userId;
    const room = await prismaClient.room.create({
      data: {
        slug: parsedInput.data.name,
        adminId: userId,
      },
    });
    res.status(200).json({
      message: `Room created successfully: ${room.slug}`,
    });
  } catch {
    res.status(400).json({
      message: "Error creating room(already exists)",
    });
  }
});

app.get("/chats/:roomId", middleware, async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);

    if (isNaN(roomId)) {
      return res.status(400).json({ error: "Invalid roomId" });
    }

    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json({ messages });
  } catch (err) {
    console.error("Error fetching chats:", err);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
});

app.get("/room/:slug", middleware, async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });
  res.json({
    room,
  });
});

app.get("/checkUser", middleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const user = await prismaClient.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      rooms: true,
    },
  })
  res.json({
    message: user
  })
});

app.listen("3001", () => {
  console.log("HTTP backend listening on port 3001");
});
