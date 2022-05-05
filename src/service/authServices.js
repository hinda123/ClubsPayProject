import { apiRequesException } from "../exceptions/apiExecption";
import { getStudentByEmail } from "../repository/studentRepo";
import {
  comparePassword,
  jwtToken,
  securityException,
  validateToken,
} from "../security/securityConfig";
import { getAdminAccountByEmail } from "./adminService";

export const signIn = async (email, password) => {
  checkEmailOrPassword(email, password);

  const student = (await getStudentByEmail(email)) || securityException();
  const iscorrect = await comparePassword(password, student.password);

  if (!iscorrect) securityException();

  return jwtToken(student.accountType, student.id);
};

export const signInByAdmin = async (email, password) => {
  checkEmailOrPassword(email, password);

  const admin = getAdminAccountByEmail(email) || securityException();

  const iscorrect = await comparePassword(password, admin.password);
  if (!iscorrect) securityException();

  return jwtToken(admin.accountType, admin.id);
};

export const genereteNewAccessToken = (refereshToken) => {
  try {
    const { accountType, id } = validateToken(refereshToken);
    return jwtToken(accountType, id);
  } catch (e) {
    apiRequesException("Refresh token is failed", 401);
  }
};

const checkEmailOrPassword = (email = " ", password = " ") => {
  email = !email ? "Email is required " : "valid";
  password = !password ? "password is required " : "Valid ";
  return { email, password };
};
