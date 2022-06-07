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
// help function.
let checkPermission = (userAccessId, role) => {
  const roles = ["staff", "moderator", "admin"];
  return new Promise(async (resolve, reject) => {
    try {
      const userAccess = await db.User.findByPk(userAccessId);
      const userAccessRole = userAccess.role;
      if (roles.indexOf(userAccessRole) <= roles.indexOf(role)) {
        resolve(false);
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const createUserAsync = (
  userAccessId,
  email,
  firstName,
  lastName,
  placeManagement,
  gender,
  role
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let roles = ["staff", "moderator", "admin"];
      if (!roles.includes(role)) {
        resolve({
          success: false,
          message: "Role invalid",
        });
      }

      if ((await checkPermission(userAccessId, role)) == false) {
        resolve({
          success: false,
          message: `permission denied`,
        });
      }
      if (await checkUser(email)) {
        resolve({
          success: false,
          message: "Email already taken.",
        });
      } else {
        const defaultPassword = bcrypt.hashSync("healthyfirst", salt);
        const user = await db.User.create({
          email,
          password: defaultPassword,
          firstName,
          lastName,
          placeManagement,
          gender,
          role,
        });
        if (user) {
          resolve({
            success: true,
            message: `${role} created successfully.`,
            user,
          });
        } else {
          resolve({
            success: false,
            message: `${role} created fail.`,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const editUserAsync = (
  userAccessId,
  email,
  firstName,
  lastName,
  placeManagement,
  gender,
  role,
  editPassword
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if ((await checkPermission(userAccessId, role)) == false) {
        resolve({
          success: false,
          message: `permission denied`,
        });
      }
      if (editPassword) {
        const password = bcrypt.hashSync("healthyfirst", salt);
        const count = await db.User.update(
          {
            password: password,
            firstName,
            lastName,
            placeManagement,
            gender,
          },
          {
            where: {
              email,
            },
          }
        );
        const userEdited = await db.User.findOne({
          where: {
            email,
          },
          attributes: { exclude: ["password"] },
        });
        if (count) {
          resolve({
            success: true,
            message: "Moderator edited successfully.",
            user: userEdited,
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
            placeManagement,
            gender,
          },
          {
            where: {
              email,
            },
          }
        );
        const userEdited = await db.User.findOne({
          where: {
            email,
          },
          attributes: { exclude: ["password"] },
        });
        if (count) {
          resolve({
            success: true,
            message: "Moderator edited successfully.",
            user: userEdited,
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

const deleteUserAsync = (userAccessId, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDelete = await db.User.findByPk(id);
      const role = userDelete.role;
      if ((await checkPermission(userAccessId, role)) == false) {
        resolve({
          success: false,
          message: `permission denied`,
        });
      }
      const count = await db.User.destroy({
        where: {
          id,
        },
      });
      if (count) {
        resolve({
          success: true,
          message: "User deleted successfully.",
        });
      } else {
        resolve({
          success: false,
          message: "User deleted false.",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUsersAsycn = (role) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({
        where: {
          role,
        },
        attributes: { exclude: ["password"] },
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllUsersAsycn,
  createUserAsync,
  editUserAsync,
  deleteUserAsync,
};
