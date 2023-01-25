const express = require("express");
// const { httpAbortLaunch } = require("../../../../client/src/hooks/requests");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches); //in this case witht he slash it tells us we match the path where the router has been mounted
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);
module.exports = launchesRouter;
