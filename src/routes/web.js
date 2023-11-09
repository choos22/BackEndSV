import express from "express";
import homeController from "../controllers/homeController";
import apiController from "../controllers/apiController";
let router = express.Router();

const initApiRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("hello nhụ nhá m");
  });
  router.get("/users", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUpdateUser);
  router.post("/users/update-user", homeController.handleUpdateUser);

  router.get("/api-test", apiController.testApi);

  //web bắt đầu sử dụng bằng /
  return app.use("/", router);
};

export default initApiRoutes;
