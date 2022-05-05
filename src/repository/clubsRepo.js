import { clubInfo, mainClub } from "../utilities/prisma-utilities";
import { formatDate } from "../utilities/utility";

export const save = async (data) => {
  await mainClub.create({ data });
};

export const update = async (mcClub) => {
  await mainClub.update({ data: { ...mcClub }, where: { id: mcClub.id } });
};

export const deleteMainClub = async (id) => {
  await mainClub.delete({ where: { id } });
};

export const findMainClubs = async () => {
  return await mainClub.findMany({
    select: { id: true, clubType: true, imageIcon: true },
  });
};

export const findMainClub = async (id) => {
  return await mainClub.findFirst({ where: { id } });
};

export const findMainClubById = async (id) => {
  return await mainClub.findUnique({ where: { id } });
};

export const isMainClubExist = async (clubType) => {
  return (
    (await mainClub.count({
      where: { clubType: { equals: clubType, mode: "insensitive" } },
    })) !== 0
  );
};

// clubs info
export const saveClubInfoRepo = async (cInfo) => {
  cInfo.date = new Date();
  await clubInfo.create({ data: cInfo });
};

export const updateClub = async (club) => {
  await clubInfo.update({
    data: { ...club },
    where: { id: club.id },
  });
};

export const findClubInfosByClubType = async (clubType) => {
  return await clubInfo.findMany({
    select: {
      id: true,
      imageCover: true,
      price: true,
      title: true,
      date: true,
    },
    where: { mClub: { clubType } },
  });
};

export const findClubInfoById = async (id) => {
  return await clubInfo.findFirst({
    where: { id },
    include: { mClub: false },
  });
};

export const findClubInfoWithoutDescById = async (id) => {
  const club = await clubInfo.findFirst({
    where: { id },
    include: { mClub: false },
  });
  club.date = formatDate(club.date);
  delete club.description;
  delete club.mainClubId;

  return club;
};
