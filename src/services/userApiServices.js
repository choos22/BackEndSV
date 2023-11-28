import db from "../models/index";
import {
  checkEmailExist,
  checkPhoneExist,
  hashUserPassword,
} from "./loginRegisterServeices";
const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description", "id"] },
    });
    if (users) {
      return {
        EM: "get data success", //error message
        EC: 0, // error code
        DT: users, //data
      };
    } else {
      return {
        EM: "get data success", //error message
        EC: 0, // error code
        DT: [], //data
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with services", //error message
      EC: 1, // error code
      DT: [], //data
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["name", "description", "id"] },
      order: [["id", "DESC"]], //sắp xếp theo bảng chữ cái
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRow: count,
      totalPages: totalPages,
      users: rows,
    };
    return {
      EM: "fetch ok", //error message
      EC: 0, // error code
      DT: data, //data
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with services", //error message
      EC: 1, // error code
      DT: [], //data
    };
  }
};

const createNewUser = async (data) => {
  try {
    //check email, phone
    let isEmailExist = await checkEmailExist(data.email);
    if (isEmailExist === true) {
      return {
        EM: " The email is already exist",
        EC: 1,
        DT: "email",
      };
    }

    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: " The phone is ready",
        EC: 1,
        DT: "phone",
      };
    }
    let hashPass = hashUserPassword(data.password);
    await db.User.create({ ...data, password: hashPass });
    return {
      EM: "create ok",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: "Error with empty GroupId", //error message
        EC: 1, // error code
        DT: "group", //data
      };
    }

    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      //update
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });

      return {
        EM: "Update user succeeds", //error message
        EC: 2, // error code
        DT: "", //data
      };
    } else {
      return {
        EM: "User not found", //error message
        EC: 2, // error code
        DT: "", //data
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with services", //error message
      EC: 1, // error code
      DT: [], //data
    };
  }
};
const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await user.destroy();
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with services", //error message
      EC: 1, // error code
      DT: [], //data
    };
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
