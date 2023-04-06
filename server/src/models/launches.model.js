//const launches = require("./launches.mongo");

const launches = new Map();

function existsLaunchWithId(launchId) {
  return launches.has(launchId); // launchid = flight number
  //this function takes a launchID as an argument and returns a boolean indicating if the launch with the ID exist in launches Map
}

let latestFlightNumber = 100; //equall to last fligh no. scehduled
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch); //each flightnumber will be the id for eascha launch

function getAllLaunches() {
  // returns all the launches stored in the launches map
  return Array.from(launches.values());
} //will itterate

//The addNewLaunch function takes a launch object as an argument, generates a new flightNumber by incrementing latestFlightNumber,
//and adds the launch to the launches Map with the new flightNumber.
//The addNewLaunch function also assigns additional properties to the launch object such as success, upcoming, customers, and flightNumber
//
//
function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["Zero to Mastery", "NASA"],
      flightNumber: latestFlightNumber,
    })
  );
} ///track flight number and data so that it's returned fromm our api
//we take our launch and assign additional properties to it
function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
