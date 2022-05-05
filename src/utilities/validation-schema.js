import Joi from "joi";

export const adminSchema = {
  id: Joi.string().optional(),
  name: Joi.string().min(5).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
};

export const studentSchema = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  faculty: Joi.string().required(),
  studentId: Joi.string().required(),
};

export const updateStudentSchema = {
  id: Joi.string().optional(),
  name: Joi.string().required(),
  faculty: Joi.string().required(),
  studentId: Joi.string().required(),
};

export const eventSchema = {
  title: Joi.string().min(10).required(),
  id: Joi.string().optional(),
  media: Joi.string().optional(),
  mediaType: Joi.string().optional(),
  postedAt: Joi.date().iso().optional(),
  description: Joi.string().required(),
};

export const clubInfoRequestSchema = {
  mainClubId: Joi.string().required(),
  title: Joi.string().min(10).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0),
};
