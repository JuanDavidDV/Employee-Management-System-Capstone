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

// Login Route
adminRoutes.route("/login")
  .post(adminController.adminLogin)

adminRoutes.route("/logout")
  .get(adminController.adminLogout)
 
// Categories Route
adminRoutes.route("/categories")
  .get(adminController.getCategories)
  .post(adminController.newCategory)

// Employees Route
adminRoutes.route("/employees")
  .post(upload.single("image"), adminController.newEmployee)
  .get(adminController.getEmployees)

// Single Employee Route
adminRoutes.route("/employee/:id")
  .get(adminController.getSingleEmployee)
  .put(adminController.editSingleEmployee)
  .delete(adminController.deleteSingleEmployee)

// Dashboard Routes
adminRoutes.route("/dashboard/admin")
  .get(adminController.getAdminCount)

adminRoutes.route("/dashboard/admin-info")
.get(adminController.getAdmin)

adminRoutes.route("/dashboard/employees")
  .get(adminController.getEmployeeCount)

adminRoutes.route("/dashboard/salary")
  .get(adminController.getTotalSalary)

export default adminRoutes;
