const db = require("../models/index");

const createInspectionAsync = (startDate, endDate, sampled, premisesId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const inspection = await db.Inspection.create({
        result: null,
        startDate,
        endDate,
        sampled,
        premisesId,
      });
      if (inspection) {
        resolve({
          success: true,
          message: `inspection created successfully.`,
          inspection,
        });
      } else {
        resolve({
          success: false,
          message: `inspection created fail.`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createInspectionAsync };
