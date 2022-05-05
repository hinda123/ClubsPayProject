import express from "express";
import {
  deleteAdmin,
  getAdminById,
  saveNewAdmin,
  updateAdmin,
} from "../service/adminService";

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const student = getAdminById(id, res);
  res.send(student);
});

router.post("/sign-up", async (req, res, next) => {
  try {
    await saveNewAdmin(req.body);
    res.send("admin saved succesfully");
  } catch (e) {
    next(e);
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  updateAdmin(id, req.body);
  res.send("admin updated succesfully . ");
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteAdmin(id);
  res.send("admin deleted Succedfully . ");
});

export default router;
