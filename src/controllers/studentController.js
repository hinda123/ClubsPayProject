import express from "express";
import { authorize } from "../middlewares/auth";
import { Role } from "../security/securityConfig";
import {
  getAllStudents,
  getStudent,
  deleteStudent,
  updateStudent,
  searchStudent,
} from "../service/stduentService";

const router = express.Router();

router.get("/", authorize.bind(Role.ADMIN), async (req, res) => {
  const students = await getAllStudents();
  res.send(students);
});

router.get("/:id", authorize.bind(Role.ALL), async (req, res) => {
  const { id } = req.params;
  const student = await getStudent(id);
  res.send(student);
});

router.get("/search/student", authorize.bind(Role.ADMIN), async (req, res) => {
  const { key } = req.query;
  const student = await searchStudent(key);
  res.send(student);
});

router.put("/:id", authorize.bind(Role.STUDENT), async (req, res) => {
  const { id } = req.params;
  await updateStudent(id, req.body);
  res.send("student updated succesfully . ");
});

router.delete("/:id", authorize.bind(Role.ALL), async (req, res) => {
  const { id } = req.params;
  await deleteStudent(id);
  res.send("student deleted Succedfully . ");
});

export default router;
