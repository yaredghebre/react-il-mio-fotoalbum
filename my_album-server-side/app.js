const express = require("express");
const dotenv = require("dotenv");

// CORS
const cors = require("cors");

const app = express();

let port = +process.env.PORT || 3001;

dotenv.config();

app.use(cors());

app.use(express.json());

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
