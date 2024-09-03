"use server";
import db from "@/shared/config/database";
import { Prisma } from "@prisma/client";

export const getNotes = async (page?: number) => {
  const allNotes = await db.post.findMany({
    skip: page ? page * 10 : 0,
    take: 10,
    orderBy: {
      createdAt: "desc", // 최신순 정렬
    },
  });
  return allNotes;
};

export type InitialNoteList = Prisma.PromiseReturnType<typeof getNotes>;
