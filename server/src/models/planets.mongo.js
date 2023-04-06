const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Planet", planetSchema);
//exporting will aloow us to perfomr actions in our mongoDB when imported
//Planet is a collection in MongoDB which this schema is assigned to
