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
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri: `${process.env.BASE_URL!}/login/callback/google`,
    grant_type: "authorization_code",
  });
  const accessTokenUrl = `https://oauth2.googleapis.com/token?${accessTokenParams.toString()}`;

  const res = await fetch(accessTokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const { error, access_token } = await res.json();
  if (error) {
    return NextResponse.json({ message: "Error", status: 400 });
  }
  const userProfileResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-cache",
    }
  );
  const { sub, given_name, picture, email } = await userProfileResponse.json();
  const user = await db.user.findUnique({
    where: {
      google_id: sub,
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
      google_id: sub,
      // username: given_name,
      avatarUrl: picture,
      // email,
    },
    select: { id: true },
  });
  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect("/main");
}
