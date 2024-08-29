import db from "@/shared/config/database";
import getSession from "@/shared/config/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  if (!code || !state) {
    return notFound();
  }
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.NAVER_CLIENT_ID!,
    client_secret: process.env.NAVER_CLIENT_SECRET!,
    redirect_uri: encodeURI(`${process.env.BASE_URL!}/login/callback/naver`),
    code,
    state,
  });
  const accessTokenUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&${accessTokenParams.toString()}`;
  const res = await fetch(accessTokenUrl, {
    method: "GET",
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID!,
      "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
    },
  });
  const { error, access_token } = await res.json();
  if (error) {
    return NextResponse.json({ message: "Error", status: 400 });
  }
  const userProfileResponse = await fetch(
    "https://openapi.naver.com/v1/nid/me",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-cache",
    }
  );

  const {
    response: { id, name, mobile, profile_image, email },
  } = await userProfileResponse.json();
  const user = await db.user.findUnique({
    where: {
      naver_id: id,
    },
    select: { id: true },
  });
  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }

  const phone = mobile.split("-").join("");
  const newUser = await db.user.create({
    data: {
      naver_id: id,
      email,
      username: name,
      phone,
      avatarUrl: profile_image,
    },
    select: { id: true },
  });
  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect("/profile");
}
