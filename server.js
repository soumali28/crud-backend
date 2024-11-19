// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const zoneRoutes = require("./routes/zoneRoutes");
const planRoutes = require("./routes/planRoutes");
const billingRoutes = require("./routes/billingRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/billings", billingRoutes); 

app.use("/", (req, res) => {
  res.status(200).send("Home Page");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
