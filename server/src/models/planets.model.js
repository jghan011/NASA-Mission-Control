const fs = require("fs");
const path = require("path");

const { parse } = require("csv-parse");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

//the fs stream bis asuync are moduke exports before it finishes
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    //basically we tell it we are going out of planet models and src to server directory and go to data directory
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#", //treat lines with # as a comment
          columns: true, //return each row in our csv file as js object with key value paire
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      }) //we will just see raw data
      .on("error", (err) => {
        console.log(err);
        reject(err);
      }) //above will return error if there's a mispelling in the string as "error" is recognized in the library
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planet`);
        console.log("done");
        resolve();
      });
  });
}
//we return a promise whkch resolves once all the habitable planets have been found. we will wait for the promise to resolve before listening for request
//parse only knows about streams
//we want keys and corresponding  values and the require('csv-parse') allows us to do that
//.pipe connects the readable stream source to writeable strnig destination so the kepler file is the source and parse function is the destination...and the result we want is a series of processed rows

function getAllPlanets() {
  return habitablePlanets;
}
module.exports = {
  loadPlanetsData,
  getAllPlanets,
}; //a function along with plaent array are reutrned
