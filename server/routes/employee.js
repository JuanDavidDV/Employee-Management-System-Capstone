import express from "express";
import * as employeeController from "../controller/employee-controller.js";
import multer from "multer";
import path from "path";

const employeeRoutes = express.Router();

// Image Upload (middleware)
const storage = multer.diskStorage({
destination: (req, file, callback) => {
  console.log('File destination:', 'public/images');
  callback(null, "public/images");
}, 
  filename: (req, file, callback) => {
  const filename = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
  console.log('File name:', filename);
  callback(null, filename);
  }
});

const upload = multer({
  storage: storage
})

// Login Route
employeeRoutes.route("/login")
  .post(employeeController.employeeLogin)

employeeRoutes.route("/information/:id")
  .get(employeeController.employeeInformation)

export default employeeRoutes;
