import { adminDb } from "./firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { GenerationInput, GenerationOutput } from "./types";

// Server-side ONLY: called from API routes, never imported in client components
export async function saveGeneration(
  uid: string,
  input: GenerationInput,
  output: GenerationOutput
): Promise<string> {
  const generationsRef = adminDb
    .collection("users")
    .doc(uid)
    .collection("generations");

  const docRef = await generationsRef.add({
    productName: input.productName,
    productUrl: input.productUrl || null,
    category: input.category,
    platforms: input.platforms,
    audience: input.audience,
    tone: input.tone,
    uniquePoint: input.uniquePoint || null,
    output: output,
    createdAt: FieldValue.serverTimestamp(),
    status: "success",
  });

  return docRef.id;
}
