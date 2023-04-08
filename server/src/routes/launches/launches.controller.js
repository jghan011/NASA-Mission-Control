const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}
//thos launches model aren't js notation soo we call values on launches
//values gives us a itterable map  of the values

function httpAddNewLaunch(req, res) {
  const launch = req.body; //the body is being populated through our express.json  midware we created in app.js which will take he
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  addNewLaunch(launch);

  return res.status(201).json(launch); // 201 = created
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id); // flightnumber is id
  //the code above means you make a request  for the id ^

  //if launch doesn't exist the 404 below will be called
  if (!existsLaunchWithId(launchId))
    return res.status(404).json({
      error: "Launch not found",
    });
  //the abortLaunchByID comes from the model page
  const aborted = abortLaunchById(launchId); // Our launch Id comes fromt flight numbers
  //kif launch does exist
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
