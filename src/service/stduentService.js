import { apiRequesException } from "../exceptions/apiExecption";
import {
  count,
  deleteById,
  findAll,
  findById,
  getStudentByUniID,
  joinStudentClub,
  search,
  singUp,
  update,
} from "../repository/studentRepo";
import { encodePassword, Role } from "../security/securityConfig";
import { checkId, validateUtil } from "../utilities/utility";
import {
  studentSchema,
  updateStudentSchema,
} from "../utilities/validation-schema";

export const getAllStudents = async () => {
  return await findAll();
};

export const totalStudent = async () => {
  return await count();
};

export const getStudent = async (id) => {
  checkTheId(id);
  return (
    (await findById(id)) ||
    apiRequesException(`Error: Student of this id ${id} is not found`, 404)
  );
};
export const getStudentByUniId = async (id) => {
  checkTheId(id);
  return (
    (await getStudentByUniID(id)) ||
    apiRequesException(`Error: Student of this id ${id} is not found`, 404)
  );
};

export const saveStudent = async (student = {}) => {
  student = student;
  delete student.id;
  student.password = await encodePassword(student.password);
  validateUtil(student, studentSchema);
  await singUp(student);
};

export const updateStudent = async (id, student) => {
  checkTheId(id);
  validateUtil(student, updateStudentSchema);
  await update(student);
};

export const joinClub = async (studentId, clubId, paymentType) => {
  await joinStudentClub(studentId, clubId, paymentType);
};

export const deleteStudent = async (id) => {
  checkTheId(id);
  await deleteById(id);
};
// name student uni Id fuc
export const searchStudent = async (key) => {
  return await search(key);
};

const checkTheId = (id) => {
  checkId(id, "Student id must not be empty");
};
