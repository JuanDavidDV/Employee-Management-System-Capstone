import express from "express";
import * as adminController from "../controller/admin-controller.js";

const adminRoutes = express.Router();

adminRoutes.route("/login")
  .post(adminController.adminLogin)
  
adminRoutes.route("/add-categories")
  .post(adminController.newCategory)

export default adminRoutes;
