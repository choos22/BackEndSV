import bcrypt from "bcryptjs/dist/bcrypt";
// get the client
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models";
import user from "../models/user";

// create the connection, specify bluebird as Promise

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  console.log("check pá", hashPassword);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "backshop",
    Promise: bluebird,
  });

  // truy vấn bảng trong database xampp
  // connection.query(
  //     'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',[email, hashPass, username],
  //     function(err, results, fields) {
  //         if(err) {
  //             console.log(err);
  //         }
  //     }
  //   );
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPass,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserList = async () => {
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'backshop', Promise: bluebird});
  let newusser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "username", "email"],
    include: { model: db.Group, attributes: ["name", "description"] },
    raw: true,
    nest: true,
  });

  let r = await db.Group.findAll({
    include: { model: db.Role, where: { id: 1 } },
    raw: true,
    nest: true,
  });

  console.log("check newusser", newusser);
  console.log("check r", r);

  let users = [];
  users = await db.User.findAll();
  return users;
  // try {
  // const [rows, fields] = await connection.execute('select * from user');
  //     return rows

  // } catch (error) {
  //     console.log(error);
  // }
};

const getDeleteUser = async (userId) => {
  // DELETE FROM users WHERE id='Alfreds Futterkiste';
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'backshop', Promise: bluebird});
  await db.User.destroy({
    where: { id: userId },
  });

  // let users = []

  // try {
  // const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?',[id]);
  //     return rows

  // } catch (error) {
  //     console.log(error);
  // }
};

const getUserByid = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });

  return user.get({ plain: true });

  // DELETE FROM users WHERE id='Alfreds Futterkiste';
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'backshop', Promise: bluebird});

  // try {
  // const [rows, fields] = await connection.execute('select * FROM user WHERE id=?',[id]);
  //     return rows

  // } catch (error) {
  //     console.log(error);
  // }
};

const updateUserInfor = async (email, username, id) => {
  // UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'backshop', Promise: bluebird});

  // try {
  // const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ?  WHERE id = ?', [email,username, id]);
  //     return rows

  // } catch (error) {
  //     console.log(error);
  // }

  await db.User.update(
    {
      email: email,
      username: username,
    },
    {
      where: { id: id },
    }
  );
};

module.exports = {
  createNewUser,
  getUserList,
  getDeleteUser,
  getUserByid,
  updateUserInfor,
};
