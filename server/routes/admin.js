import express from "express";
import * as adminController from "../controller/admin-controller.js";

const adminRoutes = express.Router();

adminRoutes.route("/")
  .post(adminController.adminLogin)
