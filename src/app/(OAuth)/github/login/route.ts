import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const baseUrl = "https://github.com/login/oauth/authorize";
  //   const redirectUri = `${process.env.BASE_URL!}/github/complete`;
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
  };
  const formattedParams = new URLSearchParams(params);
  const finalUrl = `${baseUrl}?${formattedParams.toString()}`;
  return redirect(finalUrl);
}
