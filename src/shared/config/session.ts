import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

interface Session {
  id?: number;
}

export default function getSession() {
  return getIronSession<Session>(cookies(), {
    cookieName: "notishake-shake",
    password: process.env.IRON_SESSION_PASSWORD!,
  });
}
