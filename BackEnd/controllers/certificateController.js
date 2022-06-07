const randomstring = require("randomstring");
const { createCertificateAsync } = require("../services/certificateService");

const createCertificate = async (req, res) => {
  const { issueDate, expirationDate, premisesId } = req.body;
  if (!issueDate || !expirationDate || !premisesId) {
    res.status(500).json({
      success: false,
      message: "Missing parameter",
    });
  } else {
    const codeRandom = randomstring.generate({
      length: 6,
      charset: "0123456789",
    });
    const data = await createCertificateAsync(
      `CD-${codeRandom}`,
      issueDate,
      expirationDate,
      premisesId
    );
    if (data.success) {
      res.status(200).json({
        success: true,
        message: data.message,
        certificate: data.certificate,
      });
    } else {
      res.status(400).json({
        success: false,
        message: data.message,
      });
    }
  }
};
const getAllCertificates = async (req, res) => {};
const editCertificate = async (req, res) => {};
const deleteCertificate = async (req, res) => {};

module.exports = {
  createCertificate,
  getAllCertificates,
  editCertificate,
  deleteCertificate,
};
