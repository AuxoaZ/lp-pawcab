import { NextResponse } from "next/server";
import { checkServerSession } from "@/lib/auth";

export async function GET() {
  const isAuthenticated = await checkServerSession();
  return NextResponse.json({ authenticated: isAuthenticated });
}

