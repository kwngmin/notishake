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

const checkUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return Boolean(!user);
};

const checkEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(!user);
};

const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: "Username must be a string!",
      required_error: "Where is my username???",
    })
    .toLowerCase()
    .trim()
    .min(USERNAME_MIN_LENGTH)
    .refine(checkUsername, {
      message: "Username already exists",
    }),
  email: z.string().email().toLowerCase().trim().refine(checkEmail, {
    message: "Email already exists",
  }),
  password: z.string().min(PASSWORD_MIN_LENGTH).trim(),
  password_confirm: z.string().min(PASSWORD_MIN_LENGTH).trim(),
});

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result);
    bcrypt;
    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
};
