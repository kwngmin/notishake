"use server";

import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/shared/config/constants";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
import db from "@/shared/config/database";
import getSession from "@/shared/config/session";

const checkEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z.string().email().toLowerCase().trim().refine(checkEmail, {
    message: "Email already exists",
  }),
  password: z.string().min(PASSWORD_MIN_LENGTH).trim(),
});

export const logIn = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const isPasswordValid = await bcrypt.compare(
      result.data.password,
      user!.password!
    );

    if (!isPasswordValid) {
      return {
        fieldErrors: {
          password: ["Password is not valid"],
          email: [],
        },
      };
    }

    const session = await getSession();
    session.id = user!.id;
    await session.save();
    redirect("/profile");
  }
};
