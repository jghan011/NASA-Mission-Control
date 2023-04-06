const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");
const { error } = require("console");

const PORT = process.env.PORT || 8000; //different port than front end to avoid conflict
//previous port above was 8000 but conflicted with mongodb port so i switched to 7000
const MONGO_URL =
  "mongodb+srv://nasa-api:foOw9amiD19HEbH8@nasacluster.6gboity.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app); //takes app as n argument that request listener functon that resopnsde

//once allows evennt to only trigger callback once
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
}); //emmits events whe connection is ready or if there has been an error

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL); //returns a promise

  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
//any middleware we create in the app object will respond to request comng into our server.
//line 12 contd.. Express is a fancy listener function for our built in NodeJS http Server.
//line 13 contd... And the listener function we get from express that we can call on app is exactly the same as server.listen...
//we can use either to start our express server...the  beefet is we can organize our code but seperating server fucntionality from our express code.
//this allows us to not only respond to hhtttp request but other inds of connectio. like web sockets for real time communication
