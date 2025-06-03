const path = require("path");
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");

const app = express();

// Enable CORS.
app.use(
  cors({
    origin: "*", // Allow all origins.
  })
);

// Enable body parser.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public/dist")));
} else {
  app.use(express.static(path.join(__dirname, "public")));
}

app.use("/openai", require("./routes/openaiRoutes"));

// Create a health check endpoint.
app.get("/health-check", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
