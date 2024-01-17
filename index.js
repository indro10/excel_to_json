const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const app = express();
const fs = require("fs");
const multer = require("multer");
const xlsx = require("xlsx");
const port = 7000;
const getCropTreatmentData = require("./getCropTreatmentData");
const CropInfo = require("./models/CropInfo");
const { default: CropTreatmentModel } = require("./models/Croptreatment");
// Use cors middleware to enable CORS
app.use(cors());
app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configure multer to handle file uploads

// Endpoint to handle file upload
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file.buffer);

  // const excelFile = "cropsample.xlsx"; // Replace with the path to your Excel file
  const workbook = xlsx.read(req.file.buffer);
  const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet

  // Parse Excel sheet to JSON
  const Data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const modelData = getCropTreatmentData(Data);

  const savedCropInfoArray = await CropTreatmentModel.insertMany(modelData);
  // const savedCropInfoArray = await CropInfo.insertMany(cropInfoArray);
  // console.log(savedCropInfoArray);

  // Process the uploaded file (in req.file.buffer)
  // You can save it, parse it, or do any processing as needed

  res.status(200).send("File uploaded successfully.");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
