const express = require("express");
const mongoose = require("mongoose");
const Credentials = require("./config/credentials");
const connectDB = require("./config/db");
const port = Credentials.PORT;
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const adminRoutes = require("./routes/adminRoutes");
const AdminCreate = require("./controllers/adminCreated");

const app = express();

connectDB();
app.use(express.json());
AdminCreate();

app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/admin", adminRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
