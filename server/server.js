import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();
await connectDB();

//MiddleWare
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("App is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
