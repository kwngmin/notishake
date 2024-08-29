"use server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const baseUrl = "https://nid.naver.com/oauth2.0/authorize?response_type=code";
  const redirect_uri = encodeURI(
    `${process.env.BASE_URL!}/login/callback/naver`
  );
  const random_state = encodeURI(crypto.randomInt(100000, 999999).toString());
  const params = {
    client_id: process.env.NAVER_CLIENT_ID!,
    redirect_uri,
    state: random_state,
  };
  const formattedParams = new URLSearchParams(params);
  const finalUrl = `${baseUrl}&${formattedParams.toString()}`;
  return redirect(finalUrl);
}
