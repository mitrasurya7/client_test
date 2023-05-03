import { atom } from "jotai";
const { default: api } = require("../config/axios.config");

export const ebooksAtom = atom([]);
export const ebookOneAtom = atom();
export const fetchEbooks = async () => {
  try {
    let role = localStorage.getItem("role");
    if (role === "admin") {
      const { data } = await api.get("/api/ebooks/admin/list");
      return data;
    }
    const { data } = await api.get("/api/ebooks");
    return data;
  } catch (error) {
    console.log(error);
  }
};
