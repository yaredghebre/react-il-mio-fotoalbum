const express = require("express");
const dotenv = require("dotenv");

// ROUTERS
const picturesRouter = require("./routers/picturesRouter");
const categoriesRouter = require("./routers/categoriesRouter");

// MIDDLEWARES
const routeNotFound = require("./middlewares/routeNotFound");
const errorsHandler = require("./middlewares/errorsHandler");

// CORS
const cors = require("cors");

// EXPRESS
const app = express();

// PORT
let port = +process.env.PORT || 3001;

dotenv.config();

app.use(cors());

app.use(express.json());

// ROUTES
app.use("/pictures", picturesRouter);
app.use("/categories", categoriesRouter);

app.use(routeNotFound);
app.use(errorsHandler);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
