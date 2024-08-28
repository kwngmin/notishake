"use server";
import db from "@/shared/config/database";
import getSession from "@/shared/config/session";
import { z } from "zod";
import crypto from "crypto";
import { redirect } from "next/navigation";
import twilio from "twilio";
import validator from "validator";

// import validator from "validator";

type PrevStateProps = {
  token: boolean;
};

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "올바른 형식이 아닙니다."
  );

const tokenSchema = z.coerce.number().min(100000).max(999999);

const getToken = async () => {
  const token = crypto.randomInt(100000, 999999);
  const exits = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: {
      id: true,
    },
  });
  if (exits) {
    return getToken();
  } else {
    return token;
  }
};

export async function smsLogin(prevState: PrevStateProps, formData: FormData) {
  if (!prevState.token) {
    const phone = formData.get("phone_number");
    const result = await phoneSchema.safeParse(phone);
    console.log(result, "result");
    if (!result.success) {
      return { token: false, error: "잘못된 형식입니다." };
    } else {
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token: token.toString(),
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                phone: result.data,
                username: result.data,
              },
            },
          },
        },
      });
      // twilio 메세지 보내주고
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_AUTH_TOKEN!
      );
      if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
        throw new Error(
          "Twilio credentials are not set in the environment variables"
        );
      }
      console.log(result.data, "result.data");
      await client.messages.create({
        body: `Your notishake verification code is: ${token}`,
        // body: "인증번호는 " + token + "입니다.",
        to: result.data,
        // to: `+82${result.data}`,
        // to: process.env.MY_PHONE_NUMBER!,
        from: process.env.MY_TWILIO_PHONE_NUMBER!,
        // from: process.env.TWILIO_PHONE_NUMBER_SID,
      });
      console.log(token, "token");
      return { token: true };
    }
  } else {
    const token = formData.get("token");
    const result = await tokenSchema.spa(token);

    console.log(result, "result");
    if (!result.success) {
      return { token: true, error: "잘못된 형식입니다." };
    } else {
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          user: true,
          userId: true,
        },
      });
      console.log(token, "token");
      if (!token) {
        return { token: true, error: "잘못된 형식입니다." };
      }
      const session = await getSession();
      session.id = token!.userId;
      await session.save();
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: token!.user.phone,
          },
        },
      });
      return redirect("/profile");
    }
  }

  // sms 보내주고
  // return { token: 162532, error: "" };

  // const session = await getSession();

  // return { token: false, error: "" };
}
