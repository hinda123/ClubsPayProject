import {
  student as studentTB,
  joinedClub,
} from "../utilities/prisma-utilities";

export const singUp = async (student = {}) => {
  student.joindedAt = new Date();
  await studentTB.create({ data: { ...student }, include: { clubs: false } });
};

export const getStudentByEmail = async (email) => {
  return await studentTB.findUnique({
    where: { email },
    include: { clubs: true },
  });
};

export const getStudentByUniID = async (studentId) => {
  return await studentTB.findUnique({ where: { studentId } });
};

export const count = async () => {
  return await studentTB.count();
};

export const findAll = async () => {
  return await studentTB.findMany({ include: { clubs: true } });
};

export const findById = async (id = "") => {
  return await studentTB.findUnique({ where: { id } });
};

export const deleteById = async (id) => {
  return await studentTB.delete({ where: { id } });
};

export const update = async (student = {}) => {
  return await studentTB.update({
    data: { ...student },
    where: { id: student.id },
  });
};

export const joinStudentClub = async (studentId, clubId, paymentType) => {
  const expireDateOnCash = new Date();
  if (paymentType == "ON_CASH") expireDateOnCash.setHours(48);
  await joinedClub.create({
    data: { clubId, paymentType, expireDateOnCash, studentId },
  });
};

export const search = async (key) => {
  return await studentTB.findMany({
    where: {
      OR: [
        { email: { contains: key } },
        { name: { contains: key } },
        { studentId: { contains: key } },
        { email: { contains: key } },
        { faculty: { contains: key } },
      ],
    },
  });
};
