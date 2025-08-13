// server.js (CORRECTED)

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to connect to DB on each API request
// This will use the cached connection from db.js
app.use(async (req, res, next) => {
  await connectDB();
  next();
});


// Routes
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

app.get("/", (req, res) => {
  res.send("App is running...");
});


// This part for local development is fine and does not need to be changed.
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}

export default app;