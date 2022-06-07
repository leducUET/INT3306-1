const db = require("../models");

const createCertificateAsync = (
  code,
  issueDate,
  expirationDate,
  premisesId
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (expirationDate < issueDate) {
        resolve({
          success: false,
          message: "Time invalid",
        });
      } else {
        const certificate = await db.Certificate.create({
          code,
          issueDate,
          expirationDate,
          premisesId,
        });
        if (certificate) {
          resolve({
            success: true,
            message: `Certificate created successfully.`,
            certificate,
          });
        } else {
          resolve({
            success: false,
            message: `Certificate created fail.`,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createCertificateAsync,
};
