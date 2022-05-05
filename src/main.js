import eventController from "./controllers/eventController";
import studentController from "./controllers/studentController";
import authController from "./controllers/authController";
import adminController from "./controllers/adminController";
import clubController from "./controllers/clubController";
import express from "express";
import "../config";
import exceptionHandler from "./exceptions/exception-handler";
import { addDefaultAdminAccount } from "./service/adminService";
import { authorize } from "./middlewares/auth";
import { Role } from "./security/securityConfig";
import { createFolder } from "./utilities/file-store";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authController);
app.use("/api/v1/events", eventController);
app.use("/api/v1/students", studentController);
app.use("/api/v1/admin", authorize.bind(Role.ADMIN), adminController);
app.use("/api/v1/clubs", clubController);

app.use(exceptionHandler);
// default admin account
addDefaultAdminAccount();

// create folder for media storage
createFolder();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  `Listening on port ${port} ....`;
});
