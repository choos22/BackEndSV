import db from "../models/index";
const getGroup = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "ASC"]],//sắp xếp theo bảng chữ cái
    });

    return {
      EM: "Get group success", //error message
      EC: 0, // error code
      DT: data, //data
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "error from sẻvice", //error message
      EC: 1, // error code
      DT: [], //data
    };
  }
};

module.exports = { getGroup };
