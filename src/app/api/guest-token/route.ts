import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  const API_KEY = process.env.API_KEY;
  const APP_SECRET = process.env.APP_SECRET;
  const BASE_URL = process.env.BASE_URL;
  const BASE_URL_VERSION = process.env.BASE_URL_VERSION ?? "v1";


    if (!API_KEY || !APP_SECRET || !BASE_URL) {
    return NextResponse.json(
      { error: "Server misconfiguration: missing auth environment variables." },
      { status: 500 }
    );
  }



  const AUTH_URL = `${BASE_URL}/${BASE_URL_VERSION}/auth/token/`;

  try {
    const upstream = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey: API_KEY, appSecret: APP_SECRET }),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream auth failed with status ${upstream.status}` },
        { status: upstream.status }
      );
    }

    const result = await upstream.json();

    // Pull out only what the browser needs — token and expiry.
    // We deliberately strip everything else so the response is minimal.
    const accessToken: string | undefined = result?.data?.[0]?.accessToken;
    const expires: number | undefined = result?.data?.[0]?.expires;

    if (!accessToken || !expires) {
      return NextResponse.json(
        { error: "Upstream response missing accessToken or expires." },
        { status: 502 }
      );
    }

    return NextResponse.json({ accessToken, expires });
  } catch (error) {
    console.error("[guest-token] Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}