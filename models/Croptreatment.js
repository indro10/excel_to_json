import mongoose from "mongoose";

const productSubSchema = new mongoose.Schema({
  tradeName: { type: String, required: true }, //Trade Name
  company: { type: String, required: true }, // Company
});

const TreatmentSchema = new mongoose.Schema({
  chemical: { type: String, required: true }, // Management (technical name)
  dose: { type: Number, required: true }, // Dose
  unit: { type: String, required: true }, // Unit
  productInfo: {
    type: [productSubSchema], // trade name & company ==> product infor
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
});

const CropTreatmentSchema = new mongoose.Schema(
  {
    cropInfo: {
      crop: { type: String, required: true }, // crop name
      cropID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crops",
      }, //(if found in database, put it's id. otherwise leave it)
    },
    disease: { type: String, required: true }, // Pest/Disease
    severity_of_the_problem: { type: String, required: true }, // Severity of the problem
    problemType: { type: String, required: true }, // Proactive/Reactive
    duration: Number, // Duration
    weather: String, // Condition (weather)
    prevSprayRelevance: String, // Prev Spray Relevance
    soil_type: String, // Soil Type
    applicationMethod: String, // Application Method
    treatments: {
      type: [TreatmentSchema], // from K, goes to treatments
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
  },
  { timestamps: true }
);
const CropTreatmentModel = mongoose.model("CropTreatment", CropTreatmentSchema);

export default CropTreatmentModel;
