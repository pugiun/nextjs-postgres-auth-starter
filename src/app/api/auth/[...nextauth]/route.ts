// @ts-nocheck
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

const handler = async (req: NextRequest, res: NextResponse) => {
  //let maxAge = authOptions.session!.maxAge!;
  const cookieStore = cookies();
  const remember = (await cookieStore).get("remember");

  const expireInSecond =
    remember?.value === "true" ? 365 * 24 * 60 * 60 : 1 * 24 * 60 * 60;
  let maxAge = expireInSecond;

  return await NextAuth(
    req as unknown as NextRequest,
    res as unknown as NextResponse,
    {
      ...authOptions,
      session: { maxAge },
    }
  );
};

export { handler as GET, handler as POST };
