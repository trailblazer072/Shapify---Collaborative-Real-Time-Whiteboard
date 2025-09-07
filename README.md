# Shapify – Collaborative Real-Time Whiteboard

Shapify is a **full-stack collaborative whiteboard** where users can draw, edit, and delete shapes in real-time.  
It’s built with **Next.js, TypeScript, WebSockets, Prisma, and PostgreSQL**, designed for scalability and real-time collaboration.

---

## ✨ Features
- 🎨 **Collaborative Whiteboard** – draw rectangles, circles, and lines in real-time.  
- 🔄 **WebSocket Sync** – shapes update instantly across all connected users.  
- 🧹 **Eraser Tool** – delete shapes directly from the canvas.  
- 💬 **Room-based Chats** – users can join rooms and exchange messages tied to drawings.  
- 🔒 **JWT Authentication** – secure access to rooms and persistent sessions.  
- 🗄️ **Persistent Storage** – Prisma ORM with PostgreSQL for saving shapes and chat history.  
- ⚡ **Scalable Architecture** – supports future features like infinite canvas, user cursors, and advanced tools.  

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 14, TypeScript, React, TailwindCSS  
- **Backend**: Node.js, Express, WebSockets (`ws`)  
- **Database**: PostgreSQL + Prisma ORM  
- **Auth**: JWT-based authentication  
- **Deployment**: Vercel (Frontend) + Vercel/Node backend  

---

## 📂 Project Structure
```
apps/
  exceldraw-frontend   → Next.js frontend (canvas UI, authentication)
  http-backend         → Express + WebSocket backend (chat + shape sync)
  ws-backend           → Experimental WebSocket services
packages/
  backend-common       → Shared backend config (JWT secret, utils)
  db                   → Prisma ORM + database client
  typescript-config    → Shared TS config
  common               → Shared types & constants
  ui                   → Shared UI components
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/shapify.git
cd shapify
```

### 2. Install dependencies
Using **pnpm** (recommended):
```bash
pnpm install
```

### 3. Setup Environment Variables
Create `.env` files in both **frontend** and **backend** apps.

**apps/http-backend/.env**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/shapify"
JWT_SECRET="your-secret-key"
PORT=8080
```

**apps/exceldraw-frontend/.env**
```env
NEXT_PUBLIC_BACKEND_URL="http://localhost:8080"
```

### 4. Migrate the database
```bash
cd packages/db
pnpm prisma migrate dev
```

### 5. Run the development servers
```bash
# Run backend
cd apps/http-backend
pnpm dev

# Run frontend
cd apps/exceldraw-frontend
pnpm dev
```

Frontend runs on [http://localhost:3000](http://localhost:3000)  
Backend runs on [http://localhost:8080](http://localhost:8080)

---

## 📦 Build & Deployment

### Build all packages
```bash
pnpm build
```

### Deploy
- **Frontend**: Deploy `apps/exceldraw-frontend` to **Vercel**.  
- **Backend**: Deploy `apps/http-backend` to **Vercel Functions** or any Node hosting (Railway, Render, AWS).  

⚠️ Ensure you build `@repo/backend-common` and `@repo/db` before deploying, or import from `dist/` instead of `src/`.

---

## 📖 Example Resume Entry
> **Shapify – Collaborative Real-Time Whiteboard**  
> • Built a full-stack collaborative whiteboard application supporting real-time drawing, editing, and deletion with WebSocket-based synchronization.  
> • Developed backend WebSocket server with secure JWT authentication and Prisma ORM for persistent shape storage in PostgreSQL.  
> • Optimized frontend rendering by efficiently redrawing shapes on canvas using TypeScript, Next.js, and React hooks.  
> • Designed scalable architecture enabling future extensions like infinite canvas, user cursors, and advanced drawing tools.  
> • **Tech Stack**: Next.js, TypeScript, WebSockets, Prisma ORM, PostgreSQL.  

---

## 🧑‍💻 Authors
- Adarsh Raghuwanshi
