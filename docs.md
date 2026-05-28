# AffiliateBrain.AI — Product Requirements Document (PRD)
**Versi:** 1.0 — MVP Sprint 7 Hari  
**Dibuat:** Mei 2026  
**Status:** Aktif / Panduan Pengembangan

---

## Daftar Isi
1. [Visi & Misi](#1-visi--misi)
2. [Target Pengguna](#2-target-pengguna)
3. [Batasan Keras MVP](#3-batasan-keras-mvp)
4. [Fitur yang Dibangun](#4-fitur-yang-dibangun)
5. [Fitur yang TIDAK Dibangun](#5-fitur-yang-tidak-dibangun)
6. [Tech Stack & Arsitektur](#6-tech-stack--arsitektur)
7. [Struktur Aplikasi](#7-struktur-aplikasi)
8. [Alur Pengguna (User Flow)](#8-alur-pengguna-user-flow)
9. [Spesifikasi Output AI](#9-spesifikasi-output-ai)
10. [Sistem Prompt (Panduan)](#10-sistem-prompt-panduan)
11. [UI & Desain](#11-ui--desain)
12. [Roadmap 7 Hari](#12-roadmap-7-hari)
13. [Metrik Keberhasilan MVP](#13-metrik-keberhasilan-mvp)
14. [Diferensiasi & Positioning](#14-diferensiasi--positioning)
15. [Fitur Backlog (v2+)](#15-fitur-backlog-v2)

---

## 1. Visi & Misi

### Visi
Menjadi alat bantu utama bagi affiliate marketer Indonesia untuk mendominasi pasar video pendek melalui konten yang relevan, berbahasa lokal, dan bernilai viral tinggi.

### Misi MVP
Menghasilkan **blueprint strategi konten + skrip video siap pakai** dalam hitungan detik, khusus untuk ekosistem TikTok Shop, Shopee Video, dan Instagram Reels Indonesia — tanpa perlu keahlian marketing.

### Satu Kalimat Positioning
> *"ChatGPT yang sudah di-training khusus untuk affiliator Indonesia: tahu bahasa gaul, tahu Shopee, tahu TikTok Shop, dan langsung kasih strategi siap eksekusi."*

---

## 2. Target Pengguna

### Persona Utama
**"Rara" — Affiliator TikTok Aktif**
- Usia 19–32 tahun
- Sudah bergabung TikTok Shop / Shopee Affiliate
- Kesulitan konsisten bikin konten yang convert
- Menggunakan ChatGPT dengan prompt manual — tapi hasilnya generik
- Tidak punya latar belakang marketing formal
- Mobile-first, bahasa Indonesia

### Persona Sekunder
**"Budi" — Reseller yang Baru Coba Affiliate**
- Punya produk atau pilihan produk dari toko
- Baru mulai buat konten, belum tahu formula hook/CTA yang benar
- Butuh panduan step-by-step, bukan tool yang kompleks

### Yang BUKAN Target (untuk MVP)
- Brand / perusahaan besar dengan tim marketing
- Influencer dengan jutaan followers yang sudah punya agency
- Pengguna luar Indonesia

---

## 3. Batasan Keras MVP

> Aturan ini **tidak boleh dilanggar** selama sprint 7 hari. Setiap ide baru yang muncul harus melewati filter ini terlebih dahulu.

### Batasan Scope
- [ ] **Satu halaman input, satu halaman output** — tidak ada flow yang lebih kompleks dari ini
- [ ] **Tidak ada fitur real-time** (tidak ada scraping live, tidak ada API TikTok)
- [ ] **Tidak ada upload file** — semua input berupa teks/URL/pilihan
- [ ] **Tidak ada fitur sosial** (tidak ada komentar, share antar user, leaderboard)
- [ ] **Tidak ada payment/monetisasi** di sprint pertama — fokus ke product-market fit dulu
- [ ] **Tidak ada mobile app** — web responsif sudah cukup

### Batasan Teknis
- [ ] Seluruh stack menggunakan ekosistem Google (Next.js, Firebase, Vertex AI / Gemini API, Cloud Run)
- [ ] Tidak menggunakan third-party API berbayar di luar ekosistem Google
- [ ] Deploy target: **Cloud Run** (bukan Vercel, bukan Firebase Hosting untuk server-side)
- [ ] Database: **Firestore** (bukan SQL, bukan MongoDB)
- [ ] Auth: **Firebase Authentication** (Google Sign-In sebagai opsi utama)
- [ ] AI Engine: **Gemini 1.5 Flash** (bukan Pro untuk menekan biaya MVP) — upgrade ke Pro jika respons kurang memuaskan

### Batasan Waktu
- Jika sebuah fitur tidak bisa selesai dalam **setengah hari pengerjaan**, fitur itu masuk backlog, bukan MVP.

---

## 4. Fitur yang Dibangun

### F-01: Strategy Intelligence Core ⭐ (Prioritas Tertinggi)
**Apa:** User input detail produk → AI generate blueprint strategi lengkap.

**Input yang dikumpulkan:**
| Field | Tipe | Contoh |
|---|---|---|
| Nama / Link produk | Text atau URL | "Serum Vitamin C Somethinc" / shopee.co.id/... |
| Kategori produk | Dropdown | Skincare, Fashion, Elektronik, Makanan, dll |
| Platform target | Multi-select | TikTok Shop, Shopee Video, Instagram Reels |
| Target audiens | Dropdown | Remaja wanita, Ibu rumah tangga, Mahasiswa, dll |
| Gaya bahasa | Toggle | Formal / Santai / Gen-Z (Gaul) |
| Keunikan produk | Textarea (opsional) | "Harganya murah, sudah BPOM" |

**Output yang dihasilkan:**
- Ringkasan target audiens (psikografi singkat)
- 3 angle konten terbaik untuk produk ini (Angle Roulette)
- Waktu upload terbaik per platform (statis berdasarkan data umum)

---

### F-02: Content Blueprint Engine ⭐ (Prioritas Tertinggi)
**Apa:** Dari blueprint di F-01, AI generate skrip video lengkap.

**Output per angle:**
```
HOOK (0–3 detik):
[teks hook yang provokatif / menarik perhatian]

BODY (3–45 detik):
[penjelasan produk, problem-solution, atau storytelling]

CTA (45–60 detik):
[ajakan beli / klik / follow yang spesifik]
```

**Aturan output:**
- Skrip ditulis sesuai gaya bahasa yang dipilih user
- Panjang skrip disesuaikan platform (TikTok: 30–60 dtk, Reels: 15–30 dtk, Shopee: 60–90 dtk)
- Setiap angle menghasilkan **satu versi skrip lengkap**

---

### F-03: Copywriting Assets ⭐ (Prioritas Tinggi)
**Apa:** Paket caption + hashtag siap copy-paste, dilampirkan bersama output skrip.

**Output:**
- 1 caption pendek (untuk caption video, max 150 karakter)
- 1 caption panjang (untuk deskripsi kolom, max 500 karakter)
- 20–30 hashtag yang relevan (mix: niche + trending + branded)
- Hashtag dikelompokkan: `#trending` | `#niche` | `#produk`

---

### F-04: Angle Roulette ⭐ (Prioritas Tinggi)
**Apa:** Untuk setiap produk, generate 3–5 sudut pandang konten yang berbeda.

**Angle yang tersedia:**
| Kode | Nama Angle | Pendekatan |
|---|---|---|
| A1 | FOMO / Urgensi | "Jangan sampai kehabisan..." |
| A2 | Testimoni | "Sudah dicoba 10 ribu orang..." |
| A3 | Edukasi | "Ternyata bahan ini bikin..." |
| A4 | Komedi / Relatable | "POV: kamu yang..." |
| A5 | Before-After | "Sebelum pakai vs sesudah..." |

User bisa pilih angle mana yang mau di-expand jadi skrip penuh.

---

### F-05: Bahasa Gaul Mode ✨ (Diferensiasi Utama)
**Apa:** Toggle gaya bahasa yang mengubah tone seluruh output AI.

**Tiga mode:**
- **Formal:** Bahasa Indonesia baku, cocok untuk Shopee atau audiens dewasa
- **Santai:** Bahasa sehari-hari, conversational, tidak kaku
- **Gen-Z / Gaul:** Menggunakan istilah: *bestie, gaskeun, auto, worth it, no cap, cus, baper, netizen, spill, glow up, hits*

**Implementasi:** Perubahan ini dilakukan di level **system prompt** — tidak ada logic tambahan di frontend.

---

### F-06: History & Simpan Hasil (Prioritas Sedang)
**Apa:** User yang login bisa melihat hasil generate sebelumnya.

**Spesifikasi:**
- Simpan ke Firestore dengan struktur: `users/{uid}/generations/{docId}`
- Tampilkan max 10 hasil terakhir di halaman riwayat
- Setiap entry menyimpan: nama produk, tanggal, output lengkap
- User bisa klik untuk lihat ulang atau copy ulang hasilnya

---

### F-07: Auth & Onboarding (Wajib)
**Apa:** Sistem login sederhana.

**Spesifikasi:**
- Firebase Authentication dengan **Google Sign-In** sebagai metode utama
- Setelah login pertama kali, tampilkan 3-step onboarding singkat (apa itu AffiliateBrain, cara kerja, contoh output)
- Tidak ada email/password auth untuk MVP — terlalu banyak friction

---

## 5. Fitur yang TIDAK Dibangun

> Setiap kali ada godaan untuk menambahkan salah satu dari ini ke sprint 7 hari, **jawaban defaultnya adalah TIDAK**.

| Fitur | Alasan Ditunda |
|---|---|
| Performance Deep Audit (analisis video) | Butuh scraping video + scoring engine — terlalu teknis |
| Live Trends Pulse (sidebar real-time) | Butuh API TikTok atau scraper yang tidak stabil |
| Creator Personality Match | Scope terlalu luas, butuh profiling logic yang dalam |
| Prime Upload Timing (berbasis data) | Butuh dataset usage pattern Indonesia yang valid |
| GMV Predictor | Butuh integrasi data komisi yang akurat |
| Repurpose Engine lintas platform | Bisa jadi bagian dari output F-02 yang disederhanakan |
| Trend-to-Product Matching | Butuh database produk + tren yang ter-update |
| Fitur sosial (share, komentar) | Bukan prioritas untuk product-market fit |
| Monetisasi / Paywall | Fokus ke validasi dulu |
| Mobile App (iOS/Android) | Web responsif sudah cukup untuk MVP |
| Dark mode | Nice-to-have, bukan kebutuhan fungsional |
| Multi-bahasa (English) | Target hanya Indonesia untuk sekarang |

---

## 6. Tech Stack & Arsitektur

### Stack Lengkap

```
Frontend:     Next.js 14+ (App Router)
Auth:         Firebase Authentication (Google Sign-In)
Database:     Firestore (NoSQL)
AI Engine:    Gemini 1.5 Flash via Vertex AI API
Hosting:      Google Cloud Run (containerized Next.js)
Storage:      Firebase Storage (jika butuh simpan file di v2)
Styling:      Tailwind CSS
```

### Kenapa Stack Ini
- **Next.js + Cloud Run:** Full-stack dalam satu codebase, bisa server-side rendering untuk keamanan API key
- **Firebase Auth + Firestore:** Setup auth dan database dalam < 1 jam, gratis sampai batas tertentu
- **Gemini Flash (bukan Pro):** Lebih murah dan cukup cepat untuk task text generation — upgrade ke Pro jika kualitas output kurang
- **Cloud Run:** Deploy Docker container, auto-scaling, gratis tier yang cukup untuk MVP

### Arsitektur Sederhana

```
User Browser
    │
    ▼
Next.js App (Cloud Run)
    ├── /app                  ← Pages (App Router)
    ├── /api/generate         ← API Route → Vertex AI / Gemini
    ├── /api/auth             ← Firebase Auth session
    └── /lib
        ├── firebase.ts       ← Firebase client config
        ├── vertexai.ts       ← Gemini API wrapper
        └── prompts.ts        ← Semua system prompt ada di sini
    │
    ├── Firebase Auth         ← Verifikasi identitas user
    ├── Firestore             ← Simpan riwayat generate
    └── Vertex AI / Gemini    ← Engine AI
```

### Environment Variables yang Dibutuhkan
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
FIREBASE_ADMIN_SDK_KEY=        ← Server-side only

# Google Cloud / Vertex AI
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_CLOUD_LOCATION=asia-southeast1
VERTEX_AI_MODEL=gemini-1.5-flash-001

# App
NEXT_PUBLIC_APP_URL=
```

---

## 7. Struktur Aplikasi

### Halaman (Pages)

```
/                       ← Landing page + tombol mulai
/login                  ← Google Sign-In
/generate               ← Form input + tombol generate (HALAMAN UTAMA)
/result/[id]            ← Tampilkan output hasil generate
/history                ← Riwayat generate user
/onboarding             ← 3-step intro (hanya untuk new user)
```

### Struktur Komponen Utama

```
/generate
├── ProductForm          ← Semua field input (F-01)
│   ├── ProductInput     ← Text / URL input
│   ├── CategorySelect   ← Dropdown kategori
│   ├── PlatformSelect   ← Multi-select platform
│   ├── AudienceSelect   ← Dropdown audiens
│   └── ToneToggle       ← Formal / Santai / Gen-Z
│
└── GenerateButton       ← Trigger API call

/result/[id]
├── BlueprintSection     ← Target audiens + angle overview (F-01)
├── AngleRoulette        ← 3–5 angle dengan tab pilihan (F-04)
├── ScriptOutput         ← Hook / Body / CTA per angle (F-02)
├── CopywritingAssets    ← Caption + Hashtag (F-03)
├── TimingCard           ← Jadwal posting statis (F-01 extension)
└── ActionBar            ← Tombol Copy All / Simpan / Generate Ulang
```

### Struktur Firestore

```
users/
  {uid}/
    profile/
      displayName: string
      email: string
      createdAt: timestamp
      onboardingDone: boolean
    
    generations/
      {docId}/
        productName: string
        productUrl: string (opsional)
        category: string
        platforms: string[]
        audience: string
        tone: "formal" | "santai" | "genz"
        uniquePoint: string (opsional)
        output: {
          blueprint: object
          angles: object[]
          scripts: object[]
          copywriting: object
          timing: object
        }
        createdAt: timestamp
```

---

## 8. Alur Pengguna (User Flow)

```
1. User buka website
        ↓
2. Klik "Mulai Gratis" → Login Google
        ↓
3. New user → Onboarding 3 step (skip tersedia)
        ↓
4. Halaman /generate
   - Isi form (nama produk / paste link Shopee)
   - Pilih kategori, platform, audiens, gaya bahasa
   - Klik "Generate Strategi"
        ↓
5. Loading state (2–8 detik)
   - Tampilkan pesan lucu: "Lagi mikirin hook yang gak skip-able..."
        ↓
6. Redirect ke /result/[id]
   - Tampilkan semua output
   - User bisa pilih angle mana yang mau di-expand
        ↓
7. User copy output yang diinginkan
   - Tombol "Copy Skrip", "Copy Caption", "Copy Hashtag"
        ↓
8. Opsional: Klik "Generate Ulang" (tweak parameter)
   atau lihat /history untuk hasil sebelumnya
```

---

## 9. Spesifikasi Output AI

### Format Output (JSON)
API Route `/api/generate` harus return JSON dengan struktur ini:

```json
{
  "blueprint": {
    "targetAudience": "string — deskripsi singkat siapa yang akan tertarik",
    "painPoint": "string — masalah yang dipecahkan produk ini",
    "keyBenefit": "string — manfaat utama yang paling menjual",
    "recommendedAngles": ["A1", "A3", "A4"]
  },
  "angles": [
    {
      "code": "A1",
      "name": "FOMO / Urgensi",
      "hook": "string — kalimat hook untuk angle ini",
      "preview": "string — preview singkat angle ini"
    }
  ],
  "scripts": [
    {
      "angleCode": "A1",
      "hook": "string — teks 0-3 detik",
      "body": "string — teks 3-45 detik",
      "cta": "string — teks 45-60 detik",
      "estimatedDuration": "45 detik"
    }
  ],
  "copywriting": {
    "captionShort": "string — max 150 karakter",
    "captionLong": "string — max 500 karakter",
    "hashtags": {
      "trending": ["#fyp", "#viral", "#tiktok"],
      "niche": ["#skincare", "#skincareindo"],
      "product": ["#namatoko", "#namaproduk"]
    }
  },
  "timing": {
    "tiktok": ["06.00–08.00", "12.00–13.00", "19.00–22.00"],
    "reels": ["07.00–09.00", "11.00–13.00", "19.00–21.00"],
    "shopee": ["10.00–12.00", "20.00–22.00"]
  }
}
```

### Aturan Validasi Output
- Jika Gemini return output yang tidak valid JSON → retry 1x, jika gagal tampilkan error yang manusiawi
- Semua string output harus dalam bahasa yang sesuai tone yang dipilih
- Hook maksimal 2 kalimat
- CTA harus mengandung kata kerja aksi (klik, beli, cus, gaskeun, coba, dll)

---

## 10. Sistem Prompt (Panduan)

### System Prompt Utama (simpan di `/lib/prompts.ts`)

```
Kamu adalah AffiliateBrain AI — asisten strategi konten khusus untuk affiliate 
marketer Indonesia yang berjualan di TikTok Shop, Shopee Video, dan Instagram Reels.

TUGASMU:
Buat blueprint strategi konten dan skrip video yang siap dipakai berdasarkan 
informasi produk yang diberikan.

ATURAN KETAT:
1. Selalu tulis dalam Bahasa Indonesia sesuai tone yang diminta
2. Hook harus provokatif, memancing rasa penasaran atau urgensi dalam 2 kalimat
3. Skrip harus terasa natural diucapkan — bukan seperti iklan kaku
4. Setiap CTA harus spesifik dan mengandung kata kerja aksi
5. Hashtag harus relevan dan campuran trending + niche
6. Output HARUS dalam format JSON yang valid persis seperti schema yang diberikan

TONE GUIDE:
- Formal: Bahasa Indonesia baku, sopan, profesional
- Santai: Conversational, seperti ngobrol dengan teman, boleh singkat
- Gen-Z/Gaul: Gunakan kata-kata: bestie, gaskeun, auto, worth it, no cap, cus, 
  baper, spill, glow up, hits, rebahan, mantul, real talk, fr fr, slay
```

### Variabel yang Diinjeksikan ke Prompt
```
Produk: {productName}
URL Produk: {productUrl} (jika ada)
Kategori: {category}
Platform: {platforms}
Target Audiens: {audience}
Keunikan Produk: {uniquePoint}
Tone: {tone}
```

---

## 11. UI & Desain

### Prinsip Desain
- **Mobile-first** — sebagian besar user buka dari HP
- **Output-first** — setelah generate, output harus langsung keliatan tanpa scroll jauh
- **Copy-friendly** — setiap bagian output punya tombol copy sendiri
- **Loading yang menyenangkan** — jangan biarkan user lihat spinner polos


### Komponen UI Kritis
1. **ToneToggle** — tiga tombol yang bisa klik (bukan dropdown), visual jelas mana yang aktif
2. **AngleCard** — kartu per angle dengan badge nama angle, preview teks, tombol "Expand Skrip"
3. **ScriptBlock** — tiga section (Hook / Body / CTA) dengan label warna berbeda
4. **CopyButton** — ada di setiap section, ubah jadi "✓ Tersalin!" setelah klik
5. **LoadingMessages** — rotasi pesan lucu setiap 2 detik saat loading

### Loading Messages (daftar rotasi)
```javascript
const loadingMessages = [
  "Lagi mikirin hook yang gak bisa di-skip...",
  "Nanya ke database tren Indonesia dulu...",
  "Nyusun skrip yang bikin FYP...",
  "Mastiin CTAnya bikin orang langsung klik...",
  "Pilih hashtag yang pas, bukan asal tag...",
  "Hampir selesai, bentar lagi gaskeun! 🔥",
]
```

---

## 12. Roadmap 3 Hari

| Hari | Fokus | Target Selesai |
|---|---|---|
| **Hari 1** | Setup project: Next.js, Firebase config, Google Auth, Firestore rules, deploy Cloud Run pertama | App bisa dibuka online, login Google berfungsi |
| **Hari 1** | Buat halaman `/generate`: semua field form, validasi input, ToneToggle, UI mobile responsif | Form bisa diisi dan submit (belum konek AI) |
| **Hari 1** | Integrasi Vertex AI / Gemini: API route `/api/generate`, system prompt, parsing JSON output | Klik generate → dapat respons AI di console |
| **Hari 2** | Buat halaman `/result/[id]`: tampilkan semua output, AngleRoulette, ScriptBlock, CopyButton | Output AI tampil rapi di UI, tombol copy bekerja |
| **Hari 2** | Integrasi Firestore: simpan hasil ke database, buat halaman `/history` | Riwayat 10 hasil terakhir bisa dilihat user |
| **Hari 2** | Polish UI: loading state, pesan error, onboarding 3-step, responsif HP | Tidak ada tampilan yang rusak di mobile |
| **Hari 3** | Testing end-to-end, fix bug kritis, deploy final, share ke komunitas affiliate Indonesia | Bisa dipakai orang lain tanpa panduan |

---

## 13. Metrik Keberhasilan MVP

### Metrik Minggu Pertama (Hari 7–14 setelah launch)
| Metrik | Target Minimum | Cara Ukur |
|---|---|---|
| User yang daftar | 50 user | Firebase Auth console |
| Generate yang dilakukan | 100+ generasi | Firestore document count |
| User yang kembali (D7 retention) | 20% | Firestore timestamp comparison |
| Tidak ada error kritis | 0 error 500 di prod | Cloud Run logs |

### Sinyal Kualitatif (lebih penting dari angka)
- User screenshot output dan share di grup WhatsApp/Telegram affiliate
- Ada yang bilang "ini lebih enak dari ChatGPT biasa"
- Ada feedback spesifik tentang fitur yang ingin ditambahkan

### Kapan Lanjut ke v2
Lanjut ke v2 jika dalam 2 minggu setelah launch ada **minimal 20 user aktif yang generate lebih dari 3x**.

---

## 14. Diferensiasi & Positioning

### Kenapa Berbeda dari Kompetitor

| Aspek | Predis.ai / Kompetitor Global | AffiliateBrain.AI |
|---|---|---|
| Bahasa | Inggris / terjemahan kaku | Bahasa Indonesia native + gaul |
| Target | Social media manager umum | Affiliator TikTok / Shopee ID |
| Platform | Instagram, Facebook, LinkedIn | TikTok Shop, Shopee Video, Reels |
| Input | Brief umum | Detail produk + link marketplace |
| Output | Post + gambar | Skrip video siap ucap |
| Gaya bahasa | Satu ukuran untuk semua | Formal / Santai / Gen-Z toggle |
| Paham konteks lokal | Tidak | BPOM, COD, flash sale, dll |

### Kalimat Nilai Utama (untuk landing page)
1. *"Dari nama produk jadi skrip viral — dalam 10 detik."*
2. *"Bukan ChatGPT biasa. Ini khusus buat affiliator Indonesia."*
3. *"Paste link Shopee kamu, kita uruskan sisanya."*

---

## 15. Fitur Backlog (v2+)

> Ini bukan sekarang. Catat di sini supaya tidak tergoda implementasi sebelum waktunya.

### v2 (Sprint 2 — setelah validasi MVP)
- [ ] **Product Link Scanner** — auto-parse metadata produk dari URL Shopee/TikTok Shop
- [ ] **GMV Predictor** — estimasi komisi berdasarkan kategori dan platform
- [ ] **Repurpose Engine** — satu brief → output untuk 3 platform sekaligus
- [ ] **Monetisasi** — paket gratis (3 generate/hari) vs Pro (unlimited)

### v3 (Sprint 3+)
- [ ] **Performance Deep Audit** — analisis video yang sudah diupload
- [ ] **Live Trends Pulse** — audio dan topik trending minggu ini
- [ ] **Creator Personality Match** — rekomendasi persona kreator
- [ ] **Prime Upload Timing** — berbasis data usage aktual Indonesia
- [ ] **Trend-to-Product Matching** — dari tren → rekomendasi produk

### Ide Jangka Panjang (belum di-prioritaskan)
- [ ] Integrasi langsung dengan TikTok Creator Center
- [ ] A/B testing hook otomatis berdasarkan performa
- [ ] Community: sharing template strategi antar user
- [ ] WhatsApp bot untuk generate strategi via chat

---

*Dokumen ini adalah sumber kebenaran tunggal (single source of truth) untuk pengembangan AffiliateBrain.AI MVP. Setiap keputusan development harus merujuk ke dokumen ini. Update dokumen ini jika ada perubahan scope yang disepakati.*

---
**Terakhir diperbarui:** Mei 2026 | **Penulis:** AffiliateBrain Team