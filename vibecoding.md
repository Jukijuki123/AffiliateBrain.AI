# VIBECODING.md — Instruksi untuk AI Developer
## AffiliateBrain.AI | MVP Sprint 7 Hari

> **Baca file ini sepenuhnya sebelum menulis satu baris kode pun.**
> File ini adalah satu-satunya sumber kebenaran. Jika ada yang ambigu, tanya dulu — jangan berasumsi.

---

## 🧠 Siapa Kamu (Peran AI)

Kamu adalah senior full-stack developer yang membantu membangun **AffiliateBrain.AI** — platform strategi konten berbasis AI untuk affiliate marketer Indonesia.

Kamu bekerja dengan prinsip:
- **Tulis kode yang bisa langsung jalan** — bukan pseudocode, bukan placeholder `// TODO`
- **Selalu tanya sebelum buat keputusan arsitektur besar** yang tidak ada di dokumen ini
- **Jangan over-engineer** — ini MVP 7 hari, bukan produk enterprise
- **Prioritaskan yang fungsional dulu, baru yang cantik**
- **Jika ada konflik antara instruksi di sini dan intuisimu**, ikuti instruksi di sini dulu, lalu sampaikan keberatanmu

---

## 📦 Tech Stack — WAJIB DIIKUTI, TIDAK BOLEH DIGANTI

```
Framework:    Next.js 14+ (App Router, bukan Pages Router)
Runtime:      Node.js 18+
Language:     TypeScript (strict mode)
Styling:      Tailwind CSS v3
Auth:         Firebase Authentication (Google Sign-In only)
Database:     Firestore (Firebase)
AI Engine:    Google Gemini 1.5 Flash via @google/generative-ai SDK
              ATAU Vertex AI SDK jika project sudah di Google Cloud
Deployment:   Google Cloud Run (Docker container)
Package mgr:  npm (bukan yarn, bukan pnpm)
```

### Yang DILARANG digunakan:
- ❌ Vercel / Netlify (deploy ke Cloud Run)
- ❌ Prisma / PostgreSQL / MySQL (pakai Firestore)
- ❌ NextAuth (pakai Firebase Auth langsung)
- ❌ OpenAI API (pakai Gemini)
- ❌ Redux / Zustand (pakai React state + Context secukupnya)
- ❌ Axios (pakai native fetch)
- ❌ Lodash (pakai vanilla JS)
- ❌ `any` type di TypeScript tanpa komentar alasan

---

## 🗂️ Struktur Folder — Buat Persis Seperti Ini

```
affiliatebrain/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx          # Halaman login Google
│   ├── (main)/
│   │   ├── layout.tsx            # Layout dengan navbar + auth guard
│   │   ├── generate/
│   │   │   └── page.tsx          # Halaman form input utama
│   │   ├── result/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Halaman output hasil generate
│   │   ├── history/
│   │   │   └── page.tsx          # Riwayat generate user
│   │   └── onboarding/
│   │       └── page.tsx          # 3-step onboarding new user
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # POST /api/generate → Gemini
│   ├── globals.css
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page (redirect ke /generate jika login)
│
├── components/
│   ├── ui/                       # Komponen generik reusable
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── CopyButton.tsx        # Tombol copy dengan feedback "Tersalin!"
│   │   ├── LoadingSpinner.tsx
│   │   └── Badge.tsx
│   ├── form/
│   │   ├── ProductForm.tsx       # Form input utama
│   │   ├── ToneToggle.tsx        # Toggle Formal/Santai/Gen-Z
│   │   ├── PlatformSelect.tsx    # Multi-select platform
│   │   └── CategorySelect.tsx    # Dropdown kategori
│   ├── result/
│   │   ├── BlueprintSection.tsx  # Ringkasan strategi
│   │   ├── AngleRoulette.tsx     # 5 angle card dengan tab
│   │   ├── ScriptBlock.tsx       # Hook / Body / CTA display
│   │   ├── CopywritingAssets.tsx # Caption + hashtag
│   │   └── TimingCard.tsx        # Jadwal posting statis
│   └── layout/
│       ├── Navbar.tsx
│       └── AuthGuard.tsx         # Wrapper redirect ke /login jika belum auth
│
├── lib/
│   ├── firebase.ts               # Firebase client SDK config
│   ├── firebase-admin.ts         # Firebase Admin SDK (server-side)
│   ├── gemini.ts                 # Gemini API wrapper + retry logic
│   ├── prompts.ts                # SEMUA system prompt ada di sini
│   ├── firestore.ts              # Helper functions Firestore
│   └── types.ts                  # Semua TypeScript types/interfaces
│
├── hooks/
│   ├── useAuth.ts                # Custom hook untuk auth state
│   └── useGeneration.ts          # Custom hook untuk trigger generate
│
├── public/
│   └── logo.svg
│
├── .env.local                    # Environment variables (JANGAN di-commit)
├── .env.example                  # Template env vars (boleh di-commit)
├── .gitignore
├── Dockerfile                    # Untuk Cloud Run deployment
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🔐 Environment Variables

Buat file `.env.local` dengan variabel berikut. Jangan pernah hardcode nilai ini di kode:

```env
# Firebase Client (prefix NEXT_PUBLIC_ = aman di browser)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (server-side only, JANGAN prefix NEXT_PUBLIC_)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Google AI / Gemini
GEMINI_API_KEY=
GEMINI_MODEL=gemini-1.5-flash-latest

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

Buat juga `.env.example` dengan nilai kosong sebagai template.

---

## 🗄️ Skema Firestore — Implementasi Persis Seperti Ini

```
Collection: users
  Document: {uid}  ← Firebase Auth UID
    Fields:
      displayName:      string
      email:            string
      photoURL:         string
      createdAt:        Timestamp
      onboardingDone:   boolean  ← default: false

    Subcollection: generations
      Document: {auto-generated-id}
        Fields:
          productName:    string
          productUrl:     string | null
          category:       string
          platforms:      string[]   ← ["tiktok", "shopee", "reels"]
          audience:       string
          tone:           "formal" | "santai" | "genz"
          uniquePoint:    string | null
          output:         object     ← lihat GenerationOutput type di bawah
          createdAt:      Timestamp
          status:         "success" | "error"
```

### Firestore Security Rules (salin ke Firebase Console)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User hanya bisa baca/tulis data miliknya sendiri
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /generations/{generationId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

---

## 📐 TypeScript Types — Gunakan Ini di `lib/types.ts`

```typescript
// Input dari form user
export interface GenerationInput {
  productName: string;
  productUrl?: string;
  category: ProductCategory;
  platforms: Platform[];
  audience: AudienceType;
  tone: ToneType;
  uniquePoint?: string;
}

// Output dari Gemini API
export interface GenerationOutput {
  blueprint: Blueprint;
  angles: AnglePreview[];
  scripts: Script[];
  copywriting: Copywriting;
  timing: UploadTiming;
}

export interface Blueprint {
  targetAudience: string;
  painPoint: string;
  keyBenefit: string;
  recommendedAngles: AngleCode[];
}

export interface AnglePreview {
  code: AngleCode;
  name: string;
  hook: string;
  preview: string;
}

export interface Script {
  angleCode: AngleCode;
  hook: string;
  body: string;
  cta: string;
  estimatedDuration: string;
}

export interface Copywriting {
  captionShort: string;  // max 150 karakter
  captionLong: string;   // max 500 karakter
  hashtags: {
    trending: string[];
    niche: string[];
    product: string[];
  };
}

export interface UploadTiming {
  tiktok: string[];
  reels: string[];
  shopee: string[];
}

// Document yang disimpan ke Firestore
export interface GenerationDocument {
  id: string;
  productName: string;
  productUrl: string | null;
  category: ProductCategory;
  platforms: Platform[];
  audience: AudienceType;
  tone: ToneType;
  uniquePoint: string | null;
  output: GenerationOutput;
  createdAt: Date;
  status: "success" | "error";
}

// Enums / Union Types
export type ToneType = "formal" | "santai" | "genz";
export type AngleCode = "A1" | "A2" | "A3" | "A4" | "A5";
export type Platform = "tiktok" | "shopee" | "reels";

export type ProductCategory =
  | "skincare"
  | "fashion"
  | "elektronik"
  | "makanan"
  | "minuman"
  | "kesehatan"
  | "rumah_tangga"
  | "olahraga"
  | "otomotif"
  | "lainnya";

export type AudienceType =
  | "remaja_wanita"      // Perempuan 15-24 tahun
  | "remaja_pria"        // Laki-laki 15-24 tahun
  | "dewasa_wanita"      // Perempuan 25-40 tahun
  | "dewasa_pria"        // Laki-laki 25-40 tahun
  | "ibu_rumah_tangga"   // Ibu 28-45 tahun
  | "mahasiswa"          // 18-24 tahun, semua gender
  | "pekerja_kantoran"   // 22-35 tahun
  | "umum";              // Semua kalangan
```

---

## 🤖 Gemini Integration — Implementasi di `lib/gemini.ts`

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "./prompts";
import { GenerationInput, GenerationOutput } from "./types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateStrategy(
  input: GenerationInput
): Promise<GenerationOutput> {
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash-latest",
    generationConfig: {
      temperature: 0.8,        // Sedikit kreatif tapi tidak liar
      topP: 0.95,
      maxOutputTokens: 4096,
      responseMimeType: "application/json",  // Paksa output JSON
    },
  });

  const prompt = buildPrompt(input);

  // Retry sekali jika gagal
  let attempt = 0;
  while (attempt < 2) {
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsed = JSON.parse(text) as GenerationOutput;
      validateOutput(parsed);  // Lempar error jika struktur tidak valid
      return parsed;
    } catch (error) {
      attempt++;
      if (attempt >= 2) throw error;
      await new Promise((r) => setTimeout(r, 1000)); // Tunggu 1 detik sebelum retry
    }
  }

  throw new Error("Gagal generate setelah 2 percobaan");
}

// Validasi minimal — pastikan field kritis ada
function validateOutput(output: unknown): asserts output is GenerationOutput {
  const o = output as GenerationOutput;
  if (!o.blueprint || !o.scripts || !o.copywriting) {
    throw new Error("Output AI tidak lengkap");
  }
  if (!Array.isArray(o.scripts) || o.scripts.length === 0) {
    throw new Error("Tidak ada skrip yang dihasilkan");
  }
}
```

---

## 📝 System Prompt — Implementasi di `lib/prompts.ts`

```typescript
import { GenerationInput } from "./types";

const ANGLE_DEFINITIONS = {
  A1: "FOMO / Urgensi — Ciptakan rasa takut ketinggalan, stok terbatas, harga naik",
  A2: "Testimoni — Social proof, cerita pengguna nyata, sebelum-sesudah emosional",
  A3: "Edukasi — Fakta mengejutkan, edukasi bahan/manfaat, konten informatif",
  A4: "Komedi / Relatable — POV lucu, situasi sehari-hari, humor ringan",
  A5: "Before-After — Transformasi visual/emosional yang dramatis",
};

const TONE_GUIDE = {
  formal: `Gunakan Bahasa Indonesia baku dan sopan. Kalimat lengkap dan profesional. 
    Hindari singkatan dan bahasa gaul.`,
  santai: `Gunakan bahasa sehari-hari yang conversational. Boleh singkat dan langsung. 
    Seperti ngobrol dengan teman. Boleh pakai "lo/gue" tapi jangan terlalu slang.`,
  genz: `Gunakan bahasa Gen-Z Indonesia penuh. Wajib selipkan kata-kata: bestie, gaskeun, 
    auto, worth it, no cap, cus, baper, spill, glow up, hits, mantul, real talk, fr fr, 
    slay, goals, vibes, aesthetic. Kalimat pendek dan energetik.`,
};

const JSON_SCHEMA = `
{
  "blueprint": {
    "targetAudience": "deskripsi 1-2 kalimat siapa yang paling cocok beli produk ini",
    "painPoint": "masalah utama yang dipecahkan produk ini dalam 1 kalimat",
    "keyBenefit": "manfaat paling menjual dalam 1 kalimat",
    "recommendedAngles": ["A1", "A3", "A4"]
  },
  "angles": [
    {
      "code": "A1",
      "name": "FOMO / Urgensi",
      "hook": "kalimat hook spesifik untuk angle ini (max 2 kalimat)",
      "preview": "preview 1 kalimat tentang isi konten angle ini"
    }
  ],
  "scripts": [
    {
      "angleCode": "A1",
      "hook": "teks 0-3 detik, provokatif, bikin penonton berhenti scroll",
      "body": "teks 3-45 detik, problem-solution atau storytelling, natural diucapkan",
      "cta": "teks 45-60 detik, ajakan aksi spesifik dengan kata kerja",
      "estimatedDuration": "45 detik"
    }
  ],
  "copywriting": {
    "captionShort": "caption max 150 karakter termasuk 1-2 hashtag",
    "captionLong": "caption max 500 karakter dengan emoji dan hashtag",
    "hashtags": {
      "trending": ["#fyp", "#viral", "#foryou"],
      "niche": ["#skincare", "#skincareindo", "#kulitsehat"],
      "product": ["#namatoko", "#namaproduk", "#kategoriproduk"]
    }
  },
  "timing": {
    "tiktok": ["06.00-08.00", "12.00-13.00", "19.00-22.00"],
    "reels": ["07.00-09.00", "11.00-13.00", "19.00-21.00"],
    "shopee": ["10.00-12.00", "20.00-22.00"]
  }
}`;

export function buildPrompt(input: GenerationInput): string {
  const platformList = input.platforms.join(", ");
  const toneInstruction = TONE_GUIDE[input.tone];

  return `Kamu adalah AffiliateBrain AI — ahli strategi konten video pendek khusus untuk affiliate marketer Indonesia.

KONTEKS PRODUK:
- Nama/Deskripsi Produk: ${input.productName}
${input.productUrl ? `- URL Produk: ${input.productUrl}` : ""}
- Kategori: ${input.category}
- Platform Target: ${platformList}
- Target Audiens: ${input.audience}
${input.uniquePoint ? `- Keunikan Produk: ${input.uniquePoint}` : ""}

GAYA BAHASA YANG DIGUNAKAN:
${toneInstruction}

TUGAS:
Buat blueprint strategi konten dan 3 skrip video lengkap untuk platform ${platformList}.

DEFINISI ANGLE:
${Object.entries(ANGLE_DEFINITIONS)
  .map(([code, desc]) => `- ${code}: ${desc}`)
  .join("\n")}

ATURAN KETAT:
1. Pilih 3 angle terbaik dari A1-A5 yang paling cocok untuk produk ini
2. Buat skrip untuk KETIGA angle yang dipilih
3. Hook harus langsung menarik perhatian dalam 3 detik pertama — bukan kalimat pembuka biasa
4. Body harus natural diucapkan, bukan seperti teks iklan kaku
5. CTA harus spesifik, mengandung kata kerja aksi (klik, beli, cek, gaskeun, coba sekarang, dll)
6. Durasi skrip sesuaikan dengan platform: TikTok 30-60 dtk, Reels 15-30 dtk, Shopee 60-90 dtk
7. Hashtag: 5-8 trending, 8-12 niche, 5-8 produk — total 20-28 hashtag
8. Semua teks dalam bahasa sesuai GAYA BAHASA yang ditentukan di atas
9. Pahami konteks Indonesia: BPOM, COD, flash sale, ongkir gratis, dll jika relevan

FORMAT OUTPUT:
Balas HANYA dengan JSON valid mengikuti schema ini persis (tanpa markdown, tanpa penjelasan):
${JSON_SCHEMA}`;
}
```

---

## 🔌 API Route — Implementasi di `app/api/generate/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { generateStrategy } from "@/lib/gemini";
import { saveGeneration } from "@/lib/firestore";
import { GenerationInput } from "@/lib/types";

// Validasi input sebelum kirim ke Gemini
function validateInput(body: unknown): GenerationInput {
  const b = body as GenerationInput;
  if (!b.productName?.trim()) throw new Error("Nama produk wajib diisi");
  if (!b.category) throw new Error("Kategori wajib dipilih");
  if (!b.platforms?.length) throw new Error("Minimal pilih 1 platform");
  if (!b.audience) throw new Error("Target audiens wajib dipilih");
  if (!b.tone) throw new Error("Gaya bahasa wajib dipilih");
  return b;
}

export async function POST(req: NextRequest) {
  try {
    // Ambil Firebase token dari header untuk verifikasi auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verifikasi token (gunakan Firebase Admin SDK)
    // const token = authHeader.split("Bearer ")[1];
    // const decoded = await adminAuth.verifyIdToken(token);
    // const uid = decoded.uid;
    // CATATAN: Aktifkan verifikasi ini saat production

    const body = await req.json();
    const input = validateInput(body);

    // Panggil Gemini
    const output = await generateStrategy(input);

    // Simpan ke Firestore (sementara gunakan uid placeholder)
    const uid = req.headers.get("X-User-UID") || "anonymous";
    const docId = await saveGeneration(uid, input, output);

    return NextResponse.json({ id: docId, output }, { status: 200 });

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan";
    console.error("[/api/generate] Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
```

---

## 🎨 Panduan Styling Tailwind

### Warna Utama (tambahkan ke `tailwind.config.js`)

```javascript
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
        },
      },
      fontFamily: {
      },
    },
  },
};
```

### Kelas Utility yang Sering Dipakai

```
Tombol utama:    bg-brand-purple text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition
Tombol sekunder: border border-brand-purple text-brand-purple px-6 py-3 rounded-xl hover:bg-brand-purple/10
Card:            bg-white border border-gray-100 rounded-2xl p-6 shadow-sm
Badge angle:     text-xs font-semibold px-3 py-1 rounded-full
Input field:     w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple
Section hook:    border-l-4 border-brand-purple pl-4
Section body:    border-l-4 border-brand-teal pl-4
Section cta:     border-l-4 border-brand-pink pl-4
```

### Badge Warna per Angle

```
A1 FOMO:        bg-red-100 text-red-700
A2 Testimoni:   bg-blue-100 text-blue-700
A3 Edukasi:     bg-green-100 text-green-700
A4 Komedi:      bg-yellow-100 text-yellow-700
A5 Before-After: bg-purple-100 text-purple-700
```

---

## 📱 Spesifikasi Halaman per Halaman

### `/` — Landing Page
- Tampilkan jika user belum login
- Konten: Headline, 3 value proposition, tombol "Mulai Gratis"
- Jika user sudah login → redirect langsung ke `/generate`
- **Jangan** buat landing page yang kompleks — simpel dan langsung CTA

### `/login` — Halaman Login
- Hanya satu tombol: "Masuk dengan Google"
- Setelah login sukses:
  - Cek Firestore apakah user sudah ada
  - Jika baru → buat dokumen user → redirect ke `/onboarding`
  - Jika sudah ada + `onboardingDone: true` → redirect ke `/generate`
  - Jika sudah ada + `onboardingDone: false` → redirect ke `/onboarding`

### `/onboarding` — 3-Step Intro
- Step 1: "Apa itu AffiliateBrain?" — tagline + ilustrasi sederhana
- Step 2: "Cara kerjanya" — input → AI → output dalam 3 ikon
- Step 3: "Contoh output" — screenshot atau mockup hasil generate
- Tombol "Lewati" selalu tersedia di setiap step
- Setelah selesai: set `onboardingDone: true` di Firestore → redirect `/generate`

### `/generate` — Halaman Form Utama (HALAMAN TERPENTING)

**Urutan field di form:**
1. Input nama produk (text) atau URL Shopee/TikTok Shop (auto-detect jika ada "shopee.co.id" atau "tiktok.com")
2. Dropdown kategori produk
3. Multi-select platform target (TikTok Shop / Shopee Video / Instagram Reels)
4. Dropdown target audiens
5. ToneToggle: 3 tombol pill (Formal / Santai / Gen-Z 🔥)
6. Textarea opsional: "Keunikan produk kamu (opsional)"
7. Tombol "Generate Strategi 🚀"

**Behavior saat generate:**
- Disable semua input + tombol
- Tampilkan loading state dengan rotasi pesan (lihat daftar di bawah)
- Kirim POST ke `/api/generate` dengan Firebase ID token di header
- Saat sukses → redirect ke `/result/[id]`
- Saat error → tampilkan pesan error yang manusiawi (bukan stack trace)

**Loading messages (rotasi tiap 2 detik):**
```
"Lagi mikirin hook yang gak bisa di-skip..."
"Nanya ke database tren Indonesia dulu..."
"Nyusun skrip yang bikin FYP..."
"Mastiin CTAnya bikin orang langsung klik..."
"Pilih hashtag yang pas, bukan asal tag..."
"Hampir selesai, bentar lagi gaskeun! 🔥"
```

### `/result/[id]` — Halaman Output

**Urutan section dari atas ke bawah:**
1. **Header** — nama produk + badge platform + tombol "Generate Ulang"
2. **Blueprint Card** — target audiens, pain point, key benefit
3. **Angle Roulette** — 3 tab/card angle yang bisa dipilih (default: angle pertama aktif)
4. **Script Block** — untuk angle yang aktif: Hook / Body / CTA masing-masing punya CopyButton
5. **Copywriting Assets** — caption pendek + caption panjang + hashtag dengan CopyButton
6. **Timing Card** — tabel waktu posting per platform
7. **Action Bar** (sticky bottom di mobile) — tombol "Copy Semua" + "Simpan" + "Generate Ulang"

**Behavior CopyButton:**
- Klik → copy ke clipboard → teks berubah jadi "✓ Tersalin!" selama 2 detik → kembali normal
- Gunakan `navigator.clipboard.writeText()`

### `/history` — Riwayat Generate

- Tampilkan max 10 dokumen terakhir dari Firestore, diurutkan `createdAt` descending
- Setiap item: nama produk, kategori, tanggal, platform, tombol "Lihat Hasil"
- Klik "Lihat Hasil" → redirect ke `/result/[id]`
- Jika belum ada riwayat → tampilkan empty state dengan tombol "Generate Pertama"

---

## 🐳 Dockerfile — Untuk Cloud Run

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080
CMD ["node", "server.js"]
```

Tambahkan ke `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",  // WAJIB untuk Cloud Run
};

module.exports = nextConfig;
```

---

## ✅ Checklist Development per Hari

### Hari 1 — Setup & Auth
- [ ] `npx create-next-app@latest affiliatebrain --typescript --tailwind --app`
- [ ] Install dependencies: `npm i firebase firebase-admin @google/generative-ai`
- [ ] Setup Firebase project + enable Firestore + enable Google Auth
- [ ] Buat `lib/firebase.ts` dan `lib/firebase-admin.ts`
- [ ] Buat halaman `/login` dengan Google Sign-In button
- [ ] Buat `hooks/useAuth.ts`
- [ ] Buat `components/layout/AuthGuard.tsx`
- [ ] Deploy ke Cloud Run pertama (walau masih kosong) — pastikan URL bisa diakses
- [ ] **Verifikasi:** Login Google berfungsi, user tersimpan di Firestore

### Hari 2 — Form Input
- [ ] Buat semua komponen form: `ProductForm`, `ToneToggle`, `PlatformSelect`, `CategorySelect`
- [ ] Buat halaman `/generate` dengan form lengkap
- [ ] Implementasi validasi client-side (semua field required kecuali yang opsional)
- [ ] Pastikan responsive di mobile (test di Chrome DevTools 375px)
- [ ] Buat landing page `/` sederhana
- [ ] Buat halaman `/onboarding` 3-step
- [ ] **Verifikasi:** Form bisa diisi, validasi berjalan, submit tidak error (walau belum konek AI)

### Hari 3 — Integrasi Gemini AI
- [ ] Buat `lib/prompts.ts` dengan `buildPrompt()` function
- [ ] Buat `lib/gemini.ts` dengan `generateStrategy()` function + retry logic
- [ ] Buat `lib/types.ts` dengan semua TypeScript interfaces
- [ ] Buat API route `app/api/generate/route.ts`
- [ ] Test API route via curl atau Postman
- [ ] **Verifikasi:** POST ke `/api/generate` → dapat respons JSON valid dari Gemini

### Hari 4 — Halaman Output
- [ ] Buat semua komponen result: `BlueprintSection`, `AngleRoulette`, `ScriptBlock`, `CopywritingAssets`, `TimingCard`
- [ ] Buat `components/ui/CopyButton.tsx` dengan feedback "Tersalin!"
- [ ] Buat halaman `/result/[id]`
- [ ] Hubungkan form submit → API → redirect ke result
- [ ] **Verifikasi:** Full flow end-to-end: isi form → generate → lihat output

### Hari 5 — Firestore & History
- [ ] Buat `lib/firestore.ts` dengan fungsi `saveGeneration()` dan `getGenerations()`
- [ ] Simpan output ke Firestore setelah generate sukses
- [ ] Buat halaman `/history` dengan list 10 generate terakhir
- [ ] Set Firestore Security Rules
- [ ] **Verifikasi:** Generate → tersimpan → muncul di history → bisa dilihat ulang

### Hari 6 — Polish & UX
- [ ] Loading state dengan rotasi pesan di halaman `/generate`
- [ ] Error handling yang manusiawi (bukan error teknis)
- [ ] Onboarding flow lengkap (termasuk set `onboardingDone` di Firestore)
- [ ] Navbar dengan link ke `/generate` dan `/history` + foto profil user
- [ ] Test seluruh flow di mobile (HP sungguhan jika bisa)
- [ ] **Verifikasi:** Tidak ada tampilan yang rusak di layar 375px

### Hari 7 — Deploy & Launch
- [ ] Build Docker image: `docker build -t affiliatebrain .`
- [ ] Push ke Google Artifact Registry
- [ ] Deploy ke Cloud Run dengan environment variables yang benar
- [ ] Test semua flow di URL production
- [ ] Fix bug kritis yang ditemukan
- [ ] Share link ke grup komunitas affiliate Indonesia
- [ ] **Verifikasi:** Orang lain bisa daftar dan generate tanpa bantuan

---

## 🚫 Aturan yang Tidak Boleh Dilanggar

1. **Jangan simpan API key di kode** — selalu pakai environment variables
2. **Jangan commit `.env.local`** — pastikan ada di `.gitignore`
3. **Jangan buat fitur yang tidak ada di checklist Hari 1-7** — tulis di TODO.md dulu
4. **Jangan ganti tech stack** tanpa diskusi eksplisit
5. **Jangan skip TypeScript types** — semua data harus punya type
6. **Jangan biarkan `console.log` di production** — pakai kondisi `process.env.NODE_ENV`
7. **Jangan hardcode teks UI dalam bahasa Inggris** — semua UI dalam Bahasa Indonesia
8. **Jangan buat halaman baru** yang tidak ada di daftar halaman di atas
9. **Jangan pakai `any` di TypeScript** — gunakan `unknown` jika terpaksa, lalu narrow type-nya
10. **Jangan lupa `responseMimeType: "application/json"`** di Gemini config — ini yang pastikan output bisa di-parse

---

## 💬 Cara Berkomunikasi dengan AI Developer

Saat meminta sesuatu ke AI, gunakan format ini untuk hasil terbaik:

```
[KONTEKS]: Apa yang sedang dikerjakan
[MASALAH]: Error atau hal yang tidak berjalan
[YANG SUDAH DICOBA]: Apa yang sudah dilakukan
[YANG DIINGINKAN]: Output yang diharapkan
```

Contoh yang baik:
> "KONTEKS: Sedang buat komponen ToneToggle di Hari 2.
> MASALAH: State tidak ter-update ketika tombol diklik.
> YANG SUDAH DICOBA: Sudah pakai useState, tapi parent tidak menerima value baru.
> YANG DIINGINKAN: ToneToggle yang bisa kirim value ke ProductForm parent."

Contoh yang kurang baik:
> "ToneToggle tidak bisa, tolong perbaiki"

---

## 📋 TODO.md — Tempat Catat Ide yang Datang Saat Coding

Setiap kali ada ide bagus yang muncul tapi tidak ada di checklist 7 hari, **jangan langsung implement**. Catat di `TODO.md` dengan format:

```markdown
## Ide yang Muncul Saat Development

### [tanggal] — [nama ide]
**Deskripsi:** Apa idenya
**Kenapa menarik:** Alasan
**Estimasi waktu:** Berapa lama jika diimplementasi
**Prioritas:** v2 / v3 / someday
```

---

*File ini dibuat sebagai panduan vibe coding AffiliateBrain.AI MVP.*  
*Semua keputusan implementasi merujuk ke file ini dan ke `docs.md`.*  
*Jika ada kontradiksi antara keduanya, file ini yang berlaku untuk keputusan teknis.*

---
**Versi:** 1.0 | **Proyek:** AffiliateBrain.AI | **Sprint:** MVP 7 Hari