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
  const toneInstruction = TONE_GUIDE[input.tone as keyof typeof TONE_GUIDE];

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
