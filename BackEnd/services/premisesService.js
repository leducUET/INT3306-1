const db = require("../models/index");

// helper function.
let checkName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const premises = await db.Premises.findOne({ where: { name } });
      resolve(premises);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllPremisesAsycn = (district) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (district == "All") {
        const address = await db.Address.findAll({
          include: [{ model: db.Premises }],
          nest: true,
        });
        const premises = address.map((element) => {
          return element.Premise;
        });
        resolve({
          premises,
        });
      }
      const address = await db.Address.findAll({
        where: {
          district,
        },
        include: [{ model: db.Premises }],
        nest: true,
      });
      const premises = address.map((element) => {
        return element.Premise;
      });
      resolve({
        premises,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const createPremieseAsync = (name, phoneNumber, type, wards, district) => {
  return new Promise(async (resolve, reject) => {
    try {
      let types = ["production", "service"];
      if (!types.includes(type)) {
        resolve({
          success: false,
          message: "Type invalid",
        });
      }
      if (await checkName(name)) {
        resolve({
          success: false,
          message: "Name premises already taken.",
        });
      } else {
        const premises = await db.Premises.create({
          name,
          phoneNumber,
          type,
        });
        if (premises) {
          const premisesId = premises.id;
          const address = await db.Address.create({
            wards,
            district,
            premisesId,
          });
          if (address) {
            resolve({
              success: true,
              message: `Premises created successfully.`,
              premises,
            });
          }
        } else {
          resolve({
            success: false,
            message: `Premises created fail.`,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const editPremisesAsync = (name, phoneNumber, type, wards, district) => {};

const deletePremisesAsync = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await db.Premises.destroy({
        where: {
          id,
        },
      });
      if (count) {
        resolve({
          success: true,
          message: "Premises deleted successfully.",
        });
      } else {
        resolve({
          success: false,
          message: "Premises deleted false.",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllPremisesAsycn,
  createPremieseAsync,
  editPremisesAsync,
  deletePremisesAsync,
};