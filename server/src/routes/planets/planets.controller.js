const { getAllPlanets } = require("../../models/planets.model");
//when need sees the require statement above it begins running planets.model and the planets data  will start parsing asynchronously cuzz of the code we wrote
// with the promise we made planet.model.js it changews everything cuzz everything has to finsh before the model is exported
async function httpGetAllPlanets(req, res) {
  return res.status(200).json(await getAllPlanets());
  //return is usually where function stops executing
}

module.exports = {
  httpGetAllPlanets, // it will be returned as an object becasue there may be mutliple functions returned from the controller
};
