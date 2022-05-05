import { events } from "../utilities/prisma-utilities";
import { formatDate } from "../utilities/utility";

export const save = async (event = {}) => {
  event.postedAt = new Date();
  return await events.create({ data: { ...event } });
};

export const findAll = async () => {
  const selectEvents = await events.findMany();
  selectEvents.forEach(
    (event) => (event.postedAt = formatDate(event.postedAt))
  );
  return selectEvents;
};

export const countEvents = () => events.count();

export const findById = async (id = "") => {
  return await events.findUnique({ where: { id } });
};

export const update = async (event = {}) => {
  await events.update({ data: { ...event }, where: { id: event.id } });
};

export const del = async (id) => {
  return await events.delete({ where: { id } });
};
