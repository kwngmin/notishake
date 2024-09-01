"use server";

import db from "@/shared/config/database";
import getSession from "@/shared/config/session";
import { redirect } from "next/navigation";

export async function postThings(prevState: any, formData: FormData) {
  const things = formData.get("things");
  if (!things) {
    return { success: false };
  }

  const session = await getSession();
  if (!session.id) {
    return { success: false };
  }

  const post = await db.post.create({
    data: {
      things: things as string,
      userId: session.id,
    },
  });

  if (post) {
    return { success: true };
  }
  return { success: false };
}
