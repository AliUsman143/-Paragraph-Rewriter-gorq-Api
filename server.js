const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const groqRoutes = require("./routes/groqRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/groq", groqRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
