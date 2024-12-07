import express from "express";
import * as employeeController from "../controller/admin-controller.js";
import multer from "multer";
import path from "path";

const employeeRoutes = express.Router();
