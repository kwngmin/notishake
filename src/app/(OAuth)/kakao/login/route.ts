"use server";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize?";
  const redirect_uri = encodeURI(`${process.env.BASE_URL!}/kakao/complete`);
  const response_type = "code";
  // const scope = "profile_nickname, profile_image, email";
  const params = {
    response_type,
    client_id: process.env.KAKAO_CLIENT_ID!,
    redirect_uri,
  };
  const formattedParams = new URLSearchParams(params);
  const finalUrl = `${baseUrl}&${formattedParams.toString()}`;
  return redirect(finalUrl);
}
