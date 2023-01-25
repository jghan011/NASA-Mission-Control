const express = require("express");
const { httpGetAllPlanets } = require("./planets.controller"); //get all planets is a function returned from the planets controller
// the code above basically says getAllPlanets is a function from our planets.controller
const planetsController = require("./planets.controller");
const planetRouter = express.Router(); //now we can define our routes
//this is my server router it will take request that come ni from any client
//express is backend node lbrary for routng request from a client usually a web client..server doesn't have to return webpage..it will return
//Every house in woodbridge is a route ..the contorller is how
planetRouter.get("/", httpGetAllPlanets);
//
module.exports = planetRouter;

//here we take advantage of express router so we have to import express
//now to get all our planets we will need to do a get request
//to use our router we need to export it from this module so that we can make use of it in our app.js...it has all our express middleware
//a router is a express middleware that groups all our routes which we will use
