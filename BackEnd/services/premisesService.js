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
        const premiseses = address.map(async (element) => {
          return await db.Certificate.findOne({
            where: { premisesId: element.Premise.id },
          });
        });
        const dataCertificate = [];
        Promise.all(premiseses).then((res) => {
          dataCertificate.push(res);
        });
        console.log(dataCertificate);
        const premises = address.map((element, index) => {
          let status = "Chưa cấp";
          if (dataCertificate[index]) {
            if (dataCertificate.revoked) {
              status = "Đã thu hồi";
            } else {
              status = "Còn hiệu lực";
            }
          }
          return {
            id: element.Premise.id,
            name: element.Premise.name,
            phoneNumber: element.Premise.phoneNumber,
            type: element.Premise.type,
            district: element.district,
            wards: element.wards,
            status,
          };
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
        return {
          id: element.Premise.id,
          name: element.Premise.name,
          phoneNumber: element.Premise.phoneNumber,
          type: element.Premise.type,
          district: element.district,
          wards: element.wards,
        };
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
      let types = ["Sản xuất thực phẩm", "Dịch vụ ăn uống"];
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
              premises: {
                id: premises.id,
                name: premises.name,
                phoneNumber: premises.phoneNumber,
                type: premises.type,
                district: district,
                wards: wards,
                status: "Chưa cấp",
              },
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

const editPremisesAsync = (name, phoneNumber, type, wards, district) => {
  return new Promise(async (resolve, reject) => {
    try {
      let types = ["Sản xuất thực phẩm", "Dịch vụ ăn uống"];
      if (!types.includes(type)) {
        resolve({
          success: false,
          message: "Type invalid",
        });
      } else {
        const count = await db.Premises.update(
          {
            phoneNumber,
            type,
          },
          {
            where: {
              name,
            },
          }
        );
        if (count) {
          const premises = await db.Premises.findOne({
            where: {
              name,
            },
          });
          const premisesId = premises.id;
          const count = await db.Address.update(
            {
              wards,
              district,
            },
            {
              where: {
                premisesId,
              },
            }
          );
          if (count) {
            resolve({
              success: true,
              message: `Premises edited successfully.`,
              premises: {
                id: premises.id,
                name: premises.name,
                phoneNumber: premises.phoneNumber,
                type: premises.type,
                district: district,
                wards: wards,
              },
            });
          }
        } else {
          resolve({
            success: false,
            message: `Premises edited fail.`,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deletePremisesAsync = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count1 = await db.Premises.destroy({
        where: {
          id,
        },
      });
      const count2 = await db.Address.destroy({
        where: {
          premisesId: id,
        },
      });
      const count3 = await db.Certificate.destroy({
        where: {
          premisesId: id,
        },
      });
      if (count1 && count2 && count3) {
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
