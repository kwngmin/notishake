"use server";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const redirect_uri = encodeURI(`${process.env.BASE_URL!}/google/complete`);
  const params = {
    scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
    access_type: "offline",
    include_granted_scopes: "true",
    response_type: "code",
    state: "state_parameter_passthrough_value",
    redirect_uri,
    client_id: process.env.GOOGLE_CLIENT_ID!,
  };
  const formattedParams = new URLSearchParams(params);
  const finalUrl = `${baseUrl}?${formattedParams.toString()}`;
  return redirect(finalUrl);
}
