import express from "express";
import userController from "../controllers/userController";
import apiController from "../controllers/apiController";
import groupController from "../controllers/groupController";
let router = express.Router();

const initApiRoutes = (app) => {
  // router.get("/", (req, res) => {
  //   return res.send("hello nhụ nhá m");
  // });
  // router.get("/users", homeController.handleUserPage);
  // router.post("/users/create-user", homeController.handleCreateNewUser);
  // router.post("/delete-user/:id", homeController.handleDeleteUser);
  // router.get("/update-user/:id", homeController.getUpdateUser);
  // router.post("/users/update-user", homeController.handleUpdateUser);

  router.get("/api-test", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get("/user/read", userController.readFunc);
  router.post("/user/create", userController.createFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete", userController.deleteFunc);

  //roter tạo group
  router.get("/group/read", groupController.readFunc);

  //web bắt đầu sử dụng bằng /
  return app.use("/api/v1/", router);
};

export default initApiRoutes;
