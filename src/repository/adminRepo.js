import { generateID } from "../utilities/utility";

let admins = [];

export const save = (admin) => {
  admin.id = generateID();
  admins.push(admin);
};

export const update = (admin) => {
  let theAdmin = admins.find((s) => s.id == admin.id);
  theAdmin = { ...theAdmin, ...admin };
  admins = [...admins.filter((st) => st.id !== theAdmin.id), theAdmin];
  return admin;
};

export const deleteById = (id) => {
  const admin = admins.find((admin) => admin.id === id);
  let index = admins.indexOf(admin);
  admins.splice(index, 1);
  return admin;
};

export const findByEmail = (email) => {
  const [admin] = admins.filter((admin) => admin.email == email);
  return admin;
};

export const findById = (id) => {
  const [admin] = admins.filter((admin) => admin.id == id);
  return admin;
};
