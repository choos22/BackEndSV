import db from "../models/index";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
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
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
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
    await db.User.create(data);
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
    let user = await db.User.findOne({
      where: { id: data },
    });
    if (user) {
      user.update({});
    } else {
    }
  } catch (error) {
    console.log(error);
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
