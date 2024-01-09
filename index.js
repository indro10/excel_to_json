const fs = require("fs");
const xlsx = require("xlsx");

// Load Excel file
const excelFile = "cropsample.xlsx"; // Replace with the path to your Excel file
const workbook = xlsx.readFile(excelFile);
const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet

// Parse Excel sheet to JSON
const Data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

function getParsedData(EXCEL_DATA = []) {
  return EXCEL_DATA.map((data) => {
    return {
      cropinfo: {
        crop: data["Crop"],
      },
      disease: data["Pest/Disease"],
      severity_of_the_problem: data["Severity of the problem"],
      problemType: data["Proactive/Reactive"],
      duration: data["Duration"],
      weather: data["Condition (weather)"],
      prevSprayRelevance: data[""],
      soil_type: data["Soil Type??"],
      applicationMethod: data["Application Method"],
      treatments: {
        chemical: data["Management (technical name)"],
        dose: data["Dose"],
        unit: data["Unit"],
        productInfo: {
          tradeName: data["Trade Name 1"],
          company: data["Conpany"],
        },
      },
    };
  });
}
console.log(getParsedData(Data));
