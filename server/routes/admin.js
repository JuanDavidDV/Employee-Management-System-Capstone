import express from "express";
import * as adminController from "../controller/admin-controller.js";

const adminRoutes = express.Router();

adminRoutes.route("/login")
  .post(adminController.adminLogin)
 
adminRoutes.route("/categories")
  .get(adminController.getCategories)
  .post(adminController.newCategory)

adminRoutes.route("/employees")
.post(adminController.newEmployee)

export default adminRoutes;
