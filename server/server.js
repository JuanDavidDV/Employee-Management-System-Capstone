import express from "express";
import "dotenv/config";
import adminRoutes from "./routes/admin.js";
import employeeRoutes from "./routes/employee.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());  //Middleware to parse JSON on body-parser
app.use(express.static("./public")); // creates static asset for public folder containing the images

// Root route confirm successful connection to user
app.get("/", (req, res) => {
  res.send("You have successfully connected to the server.")
});

app.use("/admin", adminRoutes);  //Incorporates admin route
app.use("/employee", employeeRoutes); //Incorporates employees route 

// 404 handler
 app.use((req, res) => {
  res.status(404).send("The route you are trying to connect does not exist");
});

app.listen(PORT, () => {
  console.log(`Sever is running at http://localhost:${PORT}`);
});
