import express from "express";
import * as adminController from "../controller/admin-controller.js";
import multer from "multer";
import path from "path";

const adminRoutes = express.Router();

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

adminRoutes.route("/login")
  .post(adminController.adminLogin)
 
adminRoutes.route("/categories")
  .get(adminController.getCategories)
  .post(adminController.newCategory)

adminRoutes.route("/employees")
.post(upload.single("image"), adminController.newEmployee);

export default adminRoutes;
