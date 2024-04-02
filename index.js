const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/connectDB");
const router = require("./src/routes/router");
const { handleError } = require("./src/config/error.config");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
