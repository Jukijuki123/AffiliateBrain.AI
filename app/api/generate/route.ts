import { NextRequest, NextResponse } from "next/server";
import { generateStrategy } from "@/lib/gemini";
import { saveGeneration } from "@/lib/firestore-admin";
import { GenerationInput } from "@/lib/types";
import { adminAuth } from "@/lib/firebase-admin";

function validateInput(body: unknown): GenerationInput {
  const b = body as GenerationInput;
  if (!b.productName?.trim() && !b.productUrl?.trim()) throw new Error("Nama produk atau URL wajib diisi");
  if (!b.category) throw new Error("Kategori wajib dipilih");
  if (!b.platforms?.length) throw new Error("Minimal pilih 1 platform");
  if (!b.audience) throw new Error("Target audiens wajib dipilih");
  if (!b.tone) throw new Error("Gaya bahasa wajib dipilih");
  return b;
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    let uid = "anonymous";
    try {
      const decoded = await adminAuth.verifyIdToken(token);
      uid = decoded.uid;
    } catch (err) {
      console.error("Auth verification failed", err);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const input = validateInput(body);

    const output = await generateStrategy(input);

    const docId = await saveGeneration(uid, input, output);

    return NextResponse.json({ id: docId, output }, { status: 200 });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Terjadi kesalahan";
    console.error("[/api/generate] Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
