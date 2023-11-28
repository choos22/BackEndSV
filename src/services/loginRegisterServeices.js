require("dotenv").config();
import db from "../models/index";
import bcrypt from "bcryptjs/dist/bcrypt";
import { Op } from "sequelize";
import { getGroupWithRole } from "./JWTSetvice";

import { createJWT } from "../middleware/JWTActions";

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
        EM: " The email is already exist",
        EC: 1,
      };
    }

    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: " The phone is already exist",
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
      groupId: 4,
    });

    return {
      EM: "A user is create successfully!",
      EC: 0,
    };
  } catch (error) {
    return {
      EM: " Somthings wrongs in service...",
      EC: -2,
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
        // let token;
        let groupWithRoles = await getGroupWithRole(user);
        let payload = {
          email: user.email,
          groupWithRoles,
          expiresIn: process.env.JWT_EXPIRES_IN,
        };

        let token = createJWT(payload);
        return {
          EM: " ok",
          EC: 0,
          DT: {
            access_token: token,
            data: groupWithRoles,
          },
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
      EM: " Somethings wrongs in services...",
      EC: -2,
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
  hashUserPassword,
  checkEmailExist,
  checkPhoneExist,
};
