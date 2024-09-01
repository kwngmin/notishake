"use server";

import db from "@/shared/config/database";
import getSession from "@/shared/config/session";

export async function getUserAvatarUrl() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const photoUrl = await db.user.findUnique({
    where: {
      id: session?.id,
    },
    select: {
      avatarUrl: true,
    },
  });
  if (!photoUrl) {
    return null;
  }
  return photoUrl.avatarUrl;
}
