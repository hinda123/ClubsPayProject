import express from "express";
import { authorize } from "../middlewares/auth";
import { Role, validateToken } from "../security/securityConfig";
import "express-async-errors";
import {
  deleteMainClubById,
  getAllClubInfos,
  getAllMainClubs,
  getClubInfo,
  getClubWithoutDesc,
  joinClubOnCash,
  saveClubInfo,
  saveMainClub,
  uploadClubImage,
  uploadMainClubImage,
} from "../service/clubService";
import multer from "multer";
const router = express.Router();
const upload = multer();

router.get("/main-clubs", authorize.bind(Role.ALL), async (req, res) => {
  const mainClubs = await getAllMainClubs();
  res.send(mainClubs);
});

router.post("/main-club", authorize.bind(Role.ADMIN), async (req, res) => {
  const { clubType } = req.query;
  await saveMainClub(clubType);
  res.send(`${clubType} is saved successfully`);
});

router.delete("/main-club", authorize.bind(Role.ADMIN), async (req, res) => {
  const { id } = req.query;
  await deleteMainClubById(id);
  res.send(`Main club is deleted successfully`);
});

router.get("/club-infos", authorize.bind(Role.ALL), async (req, res) => {
  const { clubType } = req.query;
  const clubInfos = await getAllClubInfos(clubType);
  res.send(clubInfos);
});

router.get("/club-info", authorize.bind(Role.ALL), async (req, res) => {
  const { id } = req.query;
  const clubInfo = await getClubInfo(id);
  res.send(clubInfo);
});

router.get("/club-info-wt-desc", authorize.bind(Role.ALL), async (req, res) => {
  const { id } = req.query;
  const clubInfo = await getClubWithoutDesc(id);
  res.send(clubInfo);
});

router.post("/club-info", authorize.bind(Role.ADMIN), async (req, res) => {
  const clubInfoRequest = req.body;
  await saveClubInfo(clubInfoRequest);
  //res.send(`${clubType} is saved successfully`); 🤬️ waa kan waxa keenayay "clubType is not defined" ka
  res.send(`${clubInfoRequest.title} is saved successfully`);
});

router.post(
  "/main-club/upload/:id",
  authorize.bind(Role.ADMIN),
  upload.single("file"),
  async (req, res) => {
    const { id } = req.params;
    await uploadMainClubImage(id, req.file);
    res.send("Main club image is uploaded successfully");
  }
);

router.post(
  "/club-info/upload/:id",
  authorize.bind(Role.ADMIN),
  upload.single("file"),
  async (req, res) => {
    const { id } = req.params;
    await uploadClubImage(id, req.file);
    res.send("Main club image is uploaded successfully");
  }
);

router.put("/main-club", authorize.bind(Role.ADMIN), async (req, res) => {});

router.post("/club-info/join/on-cash", async (req, res) => {
  const { id } = validateToken(req.header("Authorization"));
  const { clubId } = req.query;
  await joinClubOnCash(id, clubId);
  res.send("Club joined success fully");
});

// TODO create api of posting new club, club body {clubType, title, desc, price, image}  => AUTHORITY ROLE ADMIN.

// TODO create api of updating club. => AUTHORITY ROLE ADMIN

// TODO create api of deleting club using his id => AUTHORITY ROLE ADMIN

// TODO create api of upload club image NB: clubs have only image not video => AUTHORITY ROLE ADMIN

// TODO create api fo downloading club image by using club id => AUTHORITY ROLE ALL

// TODO create api fo downloading club image by using club fileName => AUTHORITY ROLE ALL

export default router;
