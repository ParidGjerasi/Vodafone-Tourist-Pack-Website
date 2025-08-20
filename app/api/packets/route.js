import { NextResponse } from "next/server";
const SPRING = process.env.SPRING_API_BASE ?? "http://localhost:8080";

export async function GET() {
  const r = await fetch(`${SPRING}/api/packets`, { cache: "no-store" });
  if (!r.ok) return NextResponse.json({ message: "Failed to load packets" }, { status: r.status });
  return NextResponse.json(await r.json());
}
