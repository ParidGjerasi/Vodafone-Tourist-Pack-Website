export const runtime = "nodejs";

import { NextResponse } from "next/server";
const SPRING = process.env.SPRING_API_BASE ?? "http://localhost:8080";

// Adjust the forwarded URL if your backend uses another path
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const r = await fetch(`${SPRING}/api/packets/${params.id}/activate`, { method: "POST" });
  const text = await r.text();
  if (!r.ok) {
    return NextResponse.json({ message: text || "Toggle failed" }, { status: r.status });
  }
  return new NextResponse(text || "{}", { status: 200, headers: { "Content-Type": "application/json" } });
}
