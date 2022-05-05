import { apiRequesException } from "../exceptions/apiExecption";
import {
  save,
  findAll,
  update,
  findById,
  del,
  countEvents,
} from "../repository/eventRepo";
import {
  deleteFile,
  generateFileName,
  getFile,
  isImageOrVideo,
  saveFile,
} from "../utilities/file-store";
import { checkId, validateUtil } from "../utilities/utility";
import { eventSchema } from "../utilities/validation-schema";

export const getTotalEvent = () => countEvents();

export const getAllEvents = async () => await findAll();

export const getEvent = async (id) => {
  checkId(id, "Error: event id must not be empty.");
  const event =
    (await findById(id)) ||
    apiRequesException(`Error: event of this id ${id} is not found`, 404);
  return event;
};

export const saveEvent = async (event) => {
  event = validateUtil(event, eventSchema);
  await save(event);
};

export const updateEvent = async (id, event) => {
  checkId(id, "Error: event id must not be empty.");
  validateUtil(event, eventSchema);
  await update(event);
};

export const deleteEvent = async (id) => {
  checkId(id, "Error: event id must not be empty.");
  const { media } = await del(id);
  deleteFile(media);
};

export const uploadMedia = async (id, file) => {
  const event = await getEvent(id);
  const { mimetype } = file;
  const { ext, isNotValid, mediaType } = isImageOrVideo(mimetype);
  if (isNotValid)
    apiRequesException("You can upload mp4, jpg, jpeg or png", 406);
  const fileName = generateFileName(ext);
  await updateUploadedMediaEvent({ event, fileName, file, mediaType, id });
};

const updateUploadedMediaEvent = async ({
  event,
  fileName,
  file,
  mediaType,
  id,
}) => {
  deleteFile(event?.media);
  try {
    saveFile(file, fileName);
    event.media = fileName;
    event.mediaType = mediaType;
    await updateEvent(id, event);
  } catch (e) {
    apiRequesException("Uploading file is failed", 400);
  }
};

export const downloadMediaByEventId = async (id) => {
  const { media } = getEvent(id);
  if (!media)
    apiRequesException(`Error: event of this ID: ${id} have media`, 400);
  const { file, contentType } = await getFile(media);
  return {
    contentType,
    file,
  };
};

export const downloadMediaByFileName = async (fileName) => {
  if (!fileName) apiRequesException(`Error: file name must not be empty`, 400);
  const { file, contentType } = await getFile(fileName);
  return {
    contentType,
    file,
  };
};
