import { apiRequesException } from "../exceptions/apiExecption";
import {
  deleteById,
  findByEmail,
  findById,
  save,
  update,
} from "../repository/adminRepo";
import { encodePassword, Role } from "../security/securityConfig";

import { validateUtil, checkId } from "../utilities/utility";
import { adminSchema } from "../utilities/validation-schema";

export const saveNewAdmin = async (admin) => {
  validateUtil(admin, adminSchema);
  admin.password = await encodePassword(admin.password);
  admin.accountType = Role.ADMIN;
  save(admin);
};

export const deleteAdmin = (id) => {
  checkId(id, "Admin id is required");
  deleteById(id);
};

export const updateAdmin = (admin) => {
  if (!admin?.name) apiRequesException("Admin name must not be empty");
  update(admin);
};

export const getAdminAccountByEmail = (email) => {
  return findByEmail(email);
};

export const getAdminById = (id) => {
  return findById(id);
};

export const addDefaultAdminAccount = () => {
  const admin = {
    name: "Admin",
    email: "example@domain.com",
    password: "abcd1234",
  };
  saveNewAdmin(admin);
};
