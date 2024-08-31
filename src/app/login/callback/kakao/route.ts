"use server";

import db from "@/shared/config/database";
import getSession from "@/shared/config/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.KAKAO_CLIENT_ID!,
    redirect_uri: encodeURI(`${process.env.BASE_URL!}/login/callback/kakao`),
    code,
    client_secret: process.env.KAKAO_CLIENT_SECRET!,
  });
  const accessTokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&${accessTokenParams.toString()}`;

  const res = await fetch(accessTokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
  const { error, access_token, refresh_token } = await res.json();
  if (error) {
    return NextResponse.json({ message: "Error", status: 400 });
  }
  const userProfileResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    cache: "no-cache",
  });

  const response = await userProfileResponse.json();
  const {
    id,
    properties: { nickname, profile_image },
  } = response;
  console.log(response, "kakao");
  const user = await db.user.findUnique({
    where: {
      kakao_id: id,
    },
    select: { id: true },
  });
  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/main");
  }

  const newUser = await db.user.create({
    data: {
      kakao_id: id,
      // username: nickname,
      avatarUrl: profile_image,
    },
    select: { id: true },
  });
  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect("/main");
}
