import express from "express";
import "dotenv/config";
import adminRoutes from "./routes/admin.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));

app.use(express.json());  //Middleware to parse JSON on body-parser

// Root route confirm successful connection to user
app.get("/", (req, res) => {
  res.send("You have successfully connected to the server.")
});

app.use("/admin", adminRoutes);  //Incorporates admin route

// 404 handler
 app.use((req, res) => {
  res.status(404).send("The route you are trying to connect does not exist");
});

app.listen(PORT, () => {
  console.log(`Sever is running at http://localhost:${PORT}`);
});