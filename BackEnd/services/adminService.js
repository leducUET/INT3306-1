const db = require("../models/index");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
// helper function.
let checkUser = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { email } });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const createModeratorAsync = (email, firstName, lastName, gender) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (await checkUser(email)) {
        resolve({
          success: false,
          message: "Email already taken.",
        });
      } else {
        const defaultPassword = bcrypt.hashSync("healthyfirst", salt);
        const moderator = await db.User.create({
          email,
          password: defaultPassword,
          firstName,
          lastName,
          placeManagement: "All",
          gender,
          role: "moderator",
        });
        if (moderator) {
          resolve({
            success: true,
            message: "Moderator created successfully.",
            moderator,
          });
        } else {
          resolve({
            success: false,
            message: "Moderator created false.",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const editModeratorAsync = (
  email,
  firstName,
  lastName,
  gender,
  editPassword
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (editPassword) {
        const password = bcrypt.hashSync("healthyfirst", salt);
        const count = await db.User.update(
          {
            password: password,
            firstName,
            lastName,
            gender,
          },
          {
            where: {
              email,
            },
          }
        );
        if (count) {
          resolve({
            success: true,
            message: "Moderator edited successfully.",
          });
        } else {
          resolve({
            success: false,
            message: "Moderator edited false.",
          });
        }
      } else {
        const count = await db.User.update(
          {
            firstName,
            lastName,
            gender,
          },
          {
            where: {
              email,
            },
          }
        );
        if (count) {
          resolve({
            success: true,
            message: "Moderator edited successfully.",
          });
        } else {
          resolve({
            success: false,
            message: "Moderator edited false.",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteModeratorAsync = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await db.User.destroy({
        where: {
          id,
        },
      });
      if (count) {
        resolve({
          success: true,
          message: "Moderator deleted successfully.",
        });
      } else {
        resolve({
          success: false,
          message: "Moderator deleted false.",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllModeratorAsycn = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const moderators = await db.User.findAll({
        where: {
          role: "moderator",
        },
        attributes: { exclude: ["password"] },
      });
      resolve(moderators);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllModeratorAsycn,
  createModeratorAsync,
  editModeratorAsync,
  deleteModeratorAsync,
};
