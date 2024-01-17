function convertDataToArray(input_data) {
  const dataArray = [];

  // Iterate through input_data
  for (const key in input_data) {
    if (key.startsWith("Management (technical name)")) {
      const index = key.slice(-1);
      const productSchemaArray = [];

      // Extract productSchema array
      for (let i = 1; i <= 5; i++) {
        // Assuming Trade Name and Company have indices from 1 to 5
        const prefix = `Trade Name ${i}`;
        const suffix = `Company ${i}`;
        productSchemaArray.push({
          tradeName: input_data[`${prefix}_${index}`] || input_data[prefix],
          company: input_data[`${suffix}_${index}`] || input_data[suffix],
        });
      }

      dataArray.push({
        chemical: input_data[key],
        dose: input_data[`Dose_${index}`] || input_data["Dose"],
        unit: input_data[`Unit_${index}`] || input_data["Unit"],
        productSchema: productSchemaArray,
      });
    }
  }

  return dataArray;
}
const getParsedData = (data) => {
  const parsedData = data.map((item) => {
    return {
      cropInfo: {
        crop: item.Crop,
      },
      disease: item["Pest/Disease/Problem"],
      severity_of_the_problem: item["Severity of the problem"],
      problemType: item["Proactive/Reactive"],
      duration: item["Duration"],
      weather: item["Condition (weather)"],
      prevSprayRelevance: item["Prev Spray Relevance"],
      soil_type: item["Soil Type?"],
      applicationMethod: item["Application method"],
      treatments: convertDataToArray(item),
    };
  });

  return parsedData;
};

export default getParsedData;
