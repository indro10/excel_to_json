const fs = require("fs");
const xlsx = require("xlsx");

// Load Excel file
const excelFile = "cropsample.xlsx"; // Replace with the path to your Excel file
const workbook = xlsx.readFile(excelFile);
const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet

// Parse Excel sheet to JSON
const Data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

const splitIntoTreatmentsArray = (data) => {
  const splitArray = [];
  let currentObject = {};
  let foundFirstManagement = false;

  for (const key in data) {
    if (key === "Management (technical name)") {
      foundFirstManagement = true;
    }

    if (foundFirstManagement) {
      const match = key.match(/^Management \(technical name\)_(\d+)$/);

      if (match) {
        // A key like "Management (technical name)_SOMETHING" is found
        if (Object.keys(currentObject).length !== 0) {
          // If the current object is not empty, remove the "And" key if present
          delete currentObject.And;

          // Push the current object to the array
          splitArray.push(currentObject);
        }

        // Create a new object with the current key-value pair
        currentObject = { [key]: data[key] };
      } else {
        // Add key-value pairs to the current object
        currentObject[key] = data[key];
      }
    }
  }

  // Remove the "And" key from the last object (if present)
  delete currentObject.And;

  // Push the last object to the array
  splitArray.push(currentObject);

  // Print the array of objects
  return splitArray;
};

const getProductSchema = (jsonData) => {
  // Your schema specifying keys for splitting and grouping
  const schema = {
    splitKeys: ["Trade Name", "Company"],
  };

  // Function to process data based on the schema
  function processSchema(data, schema) {
    const resultArray = [];
    let currentObject = {};
    let foundCondition = false;

    Object.entries(data).forEach(([key, value]) => {
      const splitKey = schema.splitKeys.find((split) => key.includes(split));

      if (splitKey) {
        foundCondition = true;
        if (Object.keys(currentObject).length !== 0) {
          resultArray.push(currentObject);
        }

        currentObject = { [key]: value };
      } else if (foundCondition) {
        currentObject[key] = value;
      }
    });

    if (Object.keys(currentObject).length !== 0) {
      resultArray.push(currentObject);
    }

    return resultArray;
  }

  // Process the data using the schema
  const processedData = processSchema(jsonData, schema);
  return processedData;
};

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
      treatments: splitIntoTreatmentsArray(data).map((treatments) => {
        return {
          chemical: treatments["Management (technical name)"],
          dose: treatments["Dose"],
          unit: treatments["Unit"],
          productInfo: getProductSchema(treatments).map((productInfo) =>
            console.log(productInfo)
          ),
        };
      }),
    };
  });
}
getParsedData(Data);
