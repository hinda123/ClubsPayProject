import { apiRequesException } from "../exceptions/apiExecption";
import {
  deleteMainClub,
  findClubInfoById,
  findClubInfosByClubType,
  findClubInfoWithoutDescById,
  findMainClub,
  findMainClubs,
  isMainClubExist,
  save,
  saveClubInfoRepo,
  update,
  updateClub,
} from "../repository/clubsRepo";
import {
  deleteFile,
  generateFileName,
  isImageOrVideo,
  saveFile,
} from "../utilities/file-store";
import { formatDate, validateUtil } from "../utilities/utility";
import { clubInfoRequestSchema } from "../utilities/validation-schema";
import {
  getStudent,
  getStudentByUniId,
  joinClub,
  saveStudent,
  updateStudent,
} from "./stduentService";

export const saveMainClub = async (clubType) => {
  if (!clubType) apiRequesException("Clup type must not be empty", 400);
  const isExist = await isMainClubExist(clubType);
  if (isExist)
    apiRequesException(`Error: Club of ${clubType} is already exist`, 406);
  await save({ clubType });
};

export const getMainClub = async (id) => {
  return await findMainClub(id);
};

export const saveClubInfo = async (clubInfoRequest) => {
  validateUtil(clubInfoRequest, clubInfoRequestSchema);
  await saveClubInfoRepo(clubInfoRequest);
};

export const getAllMainClubs = async () => {
  return await findMainClubs();
};

export const getAllClubInfos = async (clubType) => {
  if (!clubType) apiRequesException("Clup type must not be empty", 400);
  return await (
    await findClubInfosByClubType(clubType)
  ).map((club) => ({ ...club, date: formatDate(club.date) }));
};

export const getClubInfo = async (id) => {
  const club = await findClubInfoById(id);
  if (!club) apiRequesException("This club info is not found", 404);
  club.date = formatDate(club.date);
  delete club.mainClubId;
  return club;
};

export const getClubWithoutDesc = async (id) => {
  return (
    (await findClubInfoWithoutDescById(id)) ||
    apiRequesException("This club info is not found", 404)
  );
};

export const joinClubOnCash = async (studentId, clubId) => {
  const student = await getStudent(studentId);
  const club = await getClubInfo(clubId);
  await joinClub(student.id, club.id, "ON_CASH");
};

export const deleteMainClubById = async (id) => {
  await deleteMainClub(id);
};

export const uploadMainClubImage = async (id, file) => {
  const mainClub = await getMainClub(id);
  const { mimetype } = file;
  const { ext, isNotValid } = isImageOrVideo(mimetype);
  if (isNotValid)
    apiRequesException("You can upload mp4, jpg, jpeg or png", 406);
  const fileName = generateFileName(ext);
  await updateUploadedImageMainClub({ mainClub, fileName, file });
};

const updateUploadedImageMainClub = async ({ mainClub, fileName, file }) => {
  deleteFile(mainClub?.imageIcon);
  try {
    saveFile(file, fileName);
    mainClub.imageIcon = fileName;
    await update(mainClub);
  } catch (e) {
    deleteFile(mainClub?.imageIcon);
    apiRequesException("Uploading file is failed", 400);
  }
};

export const uploadClubImage = async (id, file) => {
  const club = await findClubInfoById(id);
  const { mimetype } = file;
  const { ext, isNotValid } = isImageOrVideo(mimetype);
  if (isNotValid)
    apiRequesException("You can upload mp4, jpg, jpeg or png", 406);
  const fileName = generateFileName(ext);
  await updateUploadedImageClub({ club, fileName, file });
};

const updateUploadedImageClub = async ({ club, fileName, file }) => {
  deleteFile(club?.imageCover);
  try {
    saveFile(file, fileName);
    club.imageCover = fileName;
    await updateClub(club);
  } catch (e) {
    console.log(e);
    deleteFile(club?.imageCover);
    apiRequesException("Uploading file is failed", 400);
  }
};
