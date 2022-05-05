import express from "express";
import {
  genereteNewAccessToken,
  signIn,
  signInByAdmin,
} from "../service/authServices";
import { saveStudent } from "../service/stduentService";

const router = express.Router();

router.post("/admin/sign-in", async (req, res, next) => {
  const { email, password } = req.query;
  try {
    const token = await signInByAdmin(email, password);
    setAuthCookies(token, res);
    res.send(token);
  } catch (e) {
    next(e);
  }
});

router.post("/sign-up", async (req, res, next) => {
  try {
    await saveStudent(req.body);
    res.send("student saved succesfully");
  } catch (e) {
    next(e);
  }
});

router.post("/sign-in", async (req, res, next) => {
  const { email, password } = req.query;
  try {
    const token = await signIn(email, password);
    setAuthCookies(token, res);
    res.send(token);
  } catch (e) {
    next(e);
  }
});

router.get("/referesh-token", (req, res) => {
  const { refreshToken } = req.query;
  const token = genereteNewAccessToken(refreshToken);
  setAuthCookies(token, res);
  res.send(token);
});

const setAuthCookies = (token, res) => {
  const date = new Date();
  date.setMinutes(20);
  res.cookie("access_token", token.accessToken, {
    httpOnly: true,
    expires: date,
  });
  date.setMinutes(10);
  res.cookie("referesh_token", token.refreshToken, {
    httpOnly: true,
    expires: date,
  });
};

export default router;
