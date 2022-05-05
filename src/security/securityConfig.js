import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { apiRequesException } from "../exceptions/apiExecption";

const SECRET = "hsjdsdnvbsnvsvjabjdhjkeankjvnqnjaewkjurkfnhefq";

export const Role = {
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
  ALL: "ALL",
};

export const encodePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  return password;
};

export const comparePassword = async (password, actualPasswod) => {
  return await bcrypt.compare(password, actualPasswod);
};

export const securityException = () => {
  apiRequesException("Email or password are incorrect", 403);
};

export const jwtToken = (accountType, id) => {
  const accessToken = generateToken(
    { accountType, id },
    process.env.ACCESS_TOKEN_TIME
  );

  const refreshToken = generateToken(
    { accountType, id },
    process.env.REFRESH_TOKE_TIME
  );
  return { accessToken, refreshToken };
};

export const validateToken = (token) => {
  const { accountType, id } = verifyToken(token);
  return { accountType, id };
};

const verifyToken = (token) => {
  try {
    return Jwt.verify(token, SECRET);
  } catch (e) {
    apiRequesException("Forbidden", 403);
  }
};

const generateToken = (payloud, expiresIn = "10m") => {
  return Jwt.sign(payloud, SECRET, { algorithm: "HS256", expiresIn });
};

export const authorizeAccount = (accessToken, next, role) => {
  if (!accessToken) return apiRequesException("Access denied", 401);
  const { accountType } = verifyToken(accessToken);

  if (!role) return next();
  if (role == "ALL") return next();
  if (role === accountType) return next();
  apiRequesException("Access denied", 401);
};
