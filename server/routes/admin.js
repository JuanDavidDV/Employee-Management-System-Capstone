import express from "express";
import * as adminController from "../controller/admin-controller.js";

const adminRoutes = express.Router();

adminRoutes.route("/login")
  .post(adminController.adminLogin)
 
adminRoutes.route("/categories")
  .get(adminController.getCategories)
  .post(adminController.newCategory)

export default adminRoutes;
