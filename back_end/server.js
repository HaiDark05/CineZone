const express = require("express");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const actorRoutes = require("./routes/actorRoutes");
const authorRoutes = require("./routes/authorRoutes");
const characterRoutes = require("./routes/characterRoutes")
const locationRoutes = require("./routes/locationRoutes")
const movieRoutes = require("./routes/movieRoutes")
const typeChairRoutes = require("./routes/typeChairRoutes")
const chairRoutes = require("./routes/chairRoutes")
const cinemaRoutes = require("./routes/cinemaRoutes")
const regionRoutes = require("./routes/regionRoutes")
const foodRoutes = require("./routes/foodRoutes")
const movieScreenRoutes = require("./routes/movieScreenRoutes")
const roomRoutes = require("./routes/roomRoutes")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/characters",characterRoutes);
app.use("/api/location",locationRoutes);
app.use("/api/movies",movieRoutes);
app.use("/api/typechairs",typeChairRoutes);
app.use("/api/chairs",chairRoutes);
app.use("/api/cinemas",cinemaRoutes);
app.use("/api/regions",regionRoutes);
app.use("/api/food",foodRoutes);
app.use("/api/moviescreens",movieScreenRoutes);
app.use("/api/rooms",roomRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
