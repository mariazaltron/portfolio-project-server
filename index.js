//packages
const express = require("express");
//nodeenv
require("dotenv").config();

//routers
const authRouter = require("./routers/auth");
const serieRouter = require("./routers/series");
const watchListsRouter = require("./routers/watchLists");
const profilesRouter = require("./routers/profiles");


//constants
const { PORT } = require("./config/constants");

// Create an express app
const app = express();

// CORS middleware:  * Since our api is hosted on a different domain than our client
// we are are doing "Cross Origin Resource Sharing" (cors)
// Cross origin resource sharing is disabled by express by default
// app.use(corsMiddleWare());
var cors = require("cors");

app.use(cors());

// express.json() to be able to read request bodies of JSON requests a.k.a. body-parser
app.use(express.json());

//routes
app.use("/auth", authRouter);
app.use("/series", serieRouter);
app.use("/watchlists", watchListsRouter);
app.use("/profiles", profilesRouter);


//start listening
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
