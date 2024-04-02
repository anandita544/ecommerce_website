import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import app from "./app.js"; // Import app with .js extension
import dotenv from "dotenv";
import cors from "cors";
app.use(cors());
dotenv.config({ path: "./backend/config/config.env" }); // Adjust path to dotenv configuration

const PORT = process.env.PORT || 3000; // Set default port if not specified in environment variables

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDb();
