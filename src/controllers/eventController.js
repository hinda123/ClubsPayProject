import express from "express";
import multer from "multer";
import { authorize } from "../middlewares/auth";
import { Role } from "../security/securityConfig";
import {
  deleteEvent,
  downloadMediaByEventId,
  downloadMediaByFileName,
  getAllEvents,
  getEvent,
  saveEvent,
  updateEvent,
  uploadMedia,
} from "../service/eventService";

const router = express.Router();
const upload = multer();

router.get("/", async (req, res) => {
  const events = await getAllEvents();
  res.send(events);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const event = await getEvent(id, res);
  res.send(event);
});

router.post("/", authorize.bind(Role.ADMIN), async (req, res) => {
  await saveEvent(req.body);
  res.send("Event saved successfully");
});

router.delete("/:id", authorize.bind(Role.ADMIN), async (req, res) => {
  const { id } = req.params;
  await deleteEvent(id);
  res.send("Event is deleted successfully");
});

router.put("/:id", authorize.bind(Role.ADMIN), async (req, res) => {
  const { id } = req.params;
  await updateEvent(id, req.body);
  res.send("Event is updated successfully");
});

router.post(
  "/media/upload/:id",
  authorize.bind(Role.ADMIN),
  upload.single("file"),
  async (req, res) => {
    const { id } = req.params;
    await uploadMedia(id, req.file);
    res.send("Media is uploaded successfully");
  }
);

router.get("/media/download/:id", (req, res, next) => {
  const { id } = req.params;
  downloadMediaByEventId(id)
    .then((file) => setFileHeaders(file, res))
    .catch((err) => next(err));
});

router.get("/media/download/file/:fname", (req, res, next) => {
  const { fname } = req.params;
  downloadMediaByFileName(fname)
    .then((file) => setFileHeaders(file, res))
    .catch((err) => next(err));
});

const setFileHeaders = ({ file, contentType }, res) => {
  res.set("Content-Disposition", "inline;");
  res.contentType(contentType);
  res.send(file);
};

export default router;
