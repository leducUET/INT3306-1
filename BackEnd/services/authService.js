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

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await checkUser(email);
      if (user) {
        // user aready exist.
        const checkPassword = await bcrypt.compareSync(password, user.password);

        if (checkPassword) {
          resolve({
            success: true,
            user,
          });
        } else {
          resolve({
            success: false,
          });
        }
      } else {
        resolve({
          success: false,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { handleUserLogin };
