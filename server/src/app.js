const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const planetRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
); //function that return cors middleware
app.use(morgan("combined"));

app.use(express.json()); //Will parse any incomng json from the body of the request
app.use(express.static(path.join(__dirname, "..", "public"))); // remember we used run build so that the react build nfo could be in our server on the public side
//the build is for deployment and we are joining that with our express server so now we canacess the site from localhost:8000/index.html

app.use("/planets", planetRouter);
// now we are buildng middleware that handle request as they come into our application
app.use("/launches", launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
}); //now you can go localhost:8000 and switchbetween tabs
//first come nto express checks for json type and then fgpes to our express router
//contorller takes in actiona dnrequest from user and works with them to update
//thre star matches anything that follows the slash and matches any endpoint that sn't in the routes above and i9

module.exports = app;
