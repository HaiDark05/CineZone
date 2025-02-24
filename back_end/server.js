const express = require("express");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const actorRoutes = require("./routes/actorRoutes");
const authorRoutes = require("./routes/authorRoutes");
const characterRoutes = require("./routes/characterRoutes")
const locationRoutes = require("./routes/locationRoutes")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/characters",characterRoutes);
app.use("/api/location",locationRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
