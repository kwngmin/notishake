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
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  });
  const accessTokenUrl = `https://github.com/login/oauth/access_token?${accessTokenParams.toString()}`;

  const res = await fetch(accessTokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await res.json();
  if (error) {
    return NextResponse.json({ message: "Error", status: 400 });
  }
  const userProfileResponse = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  const { id, login, avatar_url } = await userProfileResponse.json();
  const user = await db.user.findUnique({
    where: {
      github_id: id,
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
      github_id: id,
      // username: login,
      avatarUrl: avatar_url,
    },
    select: { id: true },
  });
  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect("/main");
}
