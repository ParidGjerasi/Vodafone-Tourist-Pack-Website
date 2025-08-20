import { NextResponse } from "next/server";
const SPRING = process.env.SPRING_API_BASE ?? "http://localhost:8080";

export async function POST(req: Request) {
  const body = await req.text();
  const r = await fetch(`${SPRING}/api/activations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const txt = await r.text();
  if (!r.ok) return NextResponse.json({ message: txt || "Activation failed" }, { status: r.status });
  return new NextResponse(txt || "{}", { status: 200, headers: { "Content-Type": "application/json" } });
}
