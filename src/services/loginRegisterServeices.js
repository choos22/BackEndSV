import db from "../models/index";
import bcrypt from "bcryptjs/dist/bcrypt";
import { Op } from "sequelize";
const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);
const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  console.log("check pá", hashPassword);
  return hashPassword;
};
const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  }
  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });

  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: " The email is ready",
        EC: 1,
      };
    }

    let isPhoneExist = await checkPhoneExist(rawUserData.email);
    if (isPhoneExist === true) {
      return {
        EM: " The phone is ready",
        EC: 1,
      };
    }
    let hashPass = hashUserPassword(rawUserData.password);

    //create new user
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPass,
      phone: rawUserData.phone,
    });

    return {
      EM: " ok",
      EC: 0,
    };
  } catch (error) {
    return {
      EM: " saiiiiiiiiii",
      EC: -1,
    };
  }
};

const checkPass = (inputPass, hashPass) => {
  return bcrypt.compareSync(inputPass, hashPass); // true or false
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });

    if (user) {
      console.log("tim dc r");
      let isCorrectPass = checkPass(rawData.password, user.password);
      if (isCorrectPass === true) {
        return {
          EM: " ok",
          EC: 0,
          DT: "",
        };
      }
    }

    console.log("....", rawData.valueLogin, "pass", rawData.password);
    return {
      EM: " Your email/phone or password is incorrect!",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: " something wrongs in servicec...",
      EC: -2,
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
};
