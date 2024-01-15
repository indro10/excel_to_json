const mongoose = require("../db");

const cropInfoSchema = new mongoose.Schema({
  crop: String,
  disease: String,
  severity_of_the_problem: String,
  problemType: String,
  duration: String,
  weather: String,
  prevSprayRelevance: String,
  soil_type: String,
  applicationMethod: String,
});

const CropInfo = mongoose.model("CropInfo", cropInfoSchema);

module.exports = CropInfo;
