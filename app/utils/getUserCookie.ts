"use server";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
export const getUserCookie = () => {
  return getCookie("token", { cookies });
};
