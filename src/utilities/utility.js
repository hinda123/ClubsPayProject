import Joi from "joi";
import { apiRequesException, validate } from "../exceptions/apiExecption";
import { v4 } from "uuid";
import moment from "moment";

export const validateUtil = (payload, schema) => {
  if (!payload) apiRequesException("Payload is not be null", 400);
  const { error, value } = Joi.validate(payload, schema);
  validate(() => !!error, {
    message: errorMessage(error),
    status: 406,
  });
  return value;
};

const errorMessage = (error) =>
  error?.details?.reduce((e, c) => (e += ", " + c.message), "");

export const equalIgnoreCase = (textA, textB) => {
  if (!textA || !textB) return false;
  return textA.toLowerCase().trim() == textB.toLowerCase().trim();
};

export const checkId = (id, message) => {
  validate(() => !id, {
    message,
    status: 406,
  });
};

export const generateID = () => v4();

export const formatDate = (date, format = "LL") => {
  return moment(date ?? new Date()).format(format);
};
