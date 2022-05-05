import mime from "mime-types";
import fs from "fs";
import { apiRequesException } from "../exceptions/apiExecption";
import { fileTypeFromBuffer } from "file-type";
const acceptedMimeTypes = ["video/mp4", "image/png", "image/jpeg"];

const getMediaType = (extension) => ("mp4" == extension ? "VIDEO" : "IMAGE");

export const generateFileName = (extension) => {
  return "event-" + new Date().toISOString().concat("." + extension);
};

export const isImageOrVideo = (contentType) => {
  const ext = mime.extension(contentType);

  return {
    isNotValid: !acceptedMimeTypes.includes(contentType),
    mediaType: getMediaType(ext),
    ext,
  };
};

export const saveFile = (file, fileName) => {
  const dir = fileDirectory(fileName);
  fs.writeFileSync(dir, file.buffer);
};

export const deleteFile = (fileName) => {
  if (!fileName) return;
  fs.unlinkSync(fileDirectory(fileName));
};

export const getFile = async (fileName) => {
  try {
    const buffer = fs.readFileSync(fileDirectory(fileName));
    const { mime: contentType } = await fileTypeFromBuffer(buffer);
    return { file: buffer, contentType };
  } catch (err) {
    // TODO log the exception
    apiRequesException("Media not found", 404);
  }
};

export const createFolder = () => {
  const dirname = process.env.FILE_DIRECTORY;
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);
};

const fileDirectory = (fileName) => process.env.FILE_DIRECTORY + "/" + fileName;
