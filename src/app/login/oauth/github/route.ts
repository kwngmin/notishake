"use server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
  };
  const formattedParams = new URLSearchParams(params);
  const finalUrl = `${baseUrl}?${formattedParams.toString()}`;
  return redirect(finalUrl);
}
