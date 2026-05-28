# AffiliateBrain.AI — AI-Powered Affiliate Content Strategy Engine 🚀
[![Next.js Version](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/React-19.2.4-blue?logo=react&style=flat-square)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-v12.13.0-orange?logo=firebase&style=flat-square)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Flash_Lite-purple?logo=google-gemini&style=flat-square)](https://ai.google.dev/)
[![Docker Ready](https://img.shields.io/badge/Docker-Ready-cyan?logo=docker&style=flat-square)](https://www.docker.com/)

**AffiliateBrain.AI** adalah asisten strategi konten berbasis kecerdasan buatan (AI) kelas premium yang dirancang khusus bagi *affiliate marketer* di Indonesia. Mengubah detail produk atau link marketplace menjadi cetak biru strategi pemasaran lengkap, naskah video teleprompter pendek yang terstruktur (Hook, Body, CTA), dan aset copywriting siap pakai hanya dalam hitungan detik.

> *"Bukan sekadar ChatGPT biasa. Ini AI yang dirancang khusus untuk affiliator lokal: paham bahasa gaul, mengerti tren e-commerce Indonesia, dan langsung memberikan strategi siap eksekusi."*

---

## 🌟 Fitur Utama

1.  **Cetak Biru Strategi Konten (Strategy Intelligence Core):**
    *   Pemetaan target audiens secara psikografis secara otomatis.
    *   Identifikasi *pain point* pembeli utama dan *key benefit* produk yang menjual.
2.  **Formula Sudut Pandang Konten (Angle Roulette):**
    *   Menawarkan 5 sudut pandang kreatif yang disesuaikan secara instan: *FOMO/Urgensi, Testimoni, Edukasi/Solutif, Komedi/Drama,* dan *Sebelum vs Sesudah*.
3.  **Naskah Video Siap Rekam (Teleprompter Block):**
    *   Menyusun alur naskah video pendek yang natural (TikTok Shop, Shopee Video, IG Reels).
    *   Terbagi menjadi Hook pemikat (0-3s), Body (problem-solution), dan Call to Action (CTA) aktif dengan tombol salin mandiri untuk tiap bagian.
4.  **Aset Copywriting & Hashtag Viral:**
    *   Caption pendek (TikTok/Reels) dan caption panjang (Shopee Video) lengkap dengan emoji penarik perhatian.
    *   Daftar hashtag viral yang dikelompokkan (Trending, Niche, Produk) dengan interaksi salin satu ketukan (*one-click hashtag copy*).
5.  **Gaya Bahasa Lokal (Indonesian Tone Toggle):**
    *   **Formal:** Sopan, baku, cocok untuk produk edukatif atau audiens dewasa.
    *   **Santai:** Conversational seperti berbicara dengan teman sebaya.
    *   **Gen-Z / Gaul:** Menggunakan dialek gaul khas netizen Indonesia (*bestie, gaskeun, worth it, no cap, spill, glow up*).
6.  **Riwayat Cerdas (History Tracking):**
    *   Menyimpan secara aman 10 generasi konten terakhir Anda di Firestore dengan pencarian dinamis berbasis teks dan fitur hapus riwayat.

---

## 🛠️ Tech Stack & Arsitektur

*   **Framework:** Next.js 16.2.6 (App Router) & React 19.2.4
*   **Runtime:** Node.js 18+ (TS Strict Mode)
*   **Styling:** Tailwind CSS v4 (Desain modern, Mobile-first, Clean Ambient Glow)
*   **Database:** Cloud Firestore (NoSQL)
*   **Autentikasi:** Firebase Authentication (Google Sign-In & Email/Password)
*   **AI Engine:** Google Gemini API (`gemini-flash-lite-latest` via `@google/generative-ai` SDK) dengan validasi JSON terstruktur.
*   **Containerization & Hosting:** Docker (Multi-stage build) & Google Cloud Run

---

## 📂 Struktur Folder Proyek

```text
affiliatebrain/
├── app/                          # Next.js App Router Pages & API Routes
│   ├── (auth)/login/             # Autentikasi Klien (Google Sign-In)
│   ├── (main)/                   # Layout, Generate, Result, History & Onboarding
│   ├── api/generate/             # Endpoint POST /api/generate (Integrasi Gemini)
│   └── globals.css               # Desain Sistem & Variabel Tema Tailwind v4
├── components/
│   ├── ui/                       # Komponen UI Dasar Reusable (Button, Copy, dll)
│   ├── form/                     # Form Input Utama & Dropdown Selector
│   ├── result/                   # Rendering Hasil Strategi, Naskah & Hashtag
│   └── layout/                   # Navbar Global, AuthGuard & OnboardingModal
├── lib/
│   ├── firebase.ts               # Inisialisasi SDK Firebase Klien (Null-Safe)
│   ├── firebase-admin.ts         # Inisialisasi Firebase Admin SDK (Lazy-Proxy)
│   ├── firestore.ts              # Fungsi CRUD Firestore Klien
│   ├── gemini.ts                 # Wrapper Gemini API & Logika Retry
│   ├── prompts.ts                # Variabel System Prompt & JSON Schema
│   └── types.ts                  # Deklarasi Tipe Data Strict TypeScript
└── hooks/
    └── useAuth.ts                # React Hook untuk Monitoring State Autentikasi
```

---

## 🚀 Memulai Pengembangan

### 1. Prasyarat
Pastikan Anda telah memasang:
*   [Node.js](https://nodejs.org/) versi 18 atau lebih tinggi.
*   [npm](https://www.npmjs.com/) (bawaan Node.js).

### 2. Kloning & Instalasi Dependensi
Jalankan perintah berikut di terminal Anda:
```bash
# Masuk ke direktori proyek
cd affilatebrain

# Instalasi dependensi proyek
npm install
```

### 3. Konfigurasi Lingkungan (Environment Variables)
Salin berkas template `.env.example` menjadi `.env.local` di folder root proyek Anda:
```bash
cp .env.example .env.local
```
Buka berkas `.env.local` dan isi dengan kredensial Firebase dan Gemini API Anda:
```env
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK Credentials (Server-Side Only)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_firebase_admin_email
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"

# Google Gemini AI Config
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-flash-lite-latest

# App URL Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Menjalankan Server Pengembangan Lokal
Jalankan dev server dengan perintah berikut:
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat aplikasinya secara langsung.

### 5. Kompilasi & Build Produksi
Untuk memvalidasi serta melakukan kompilasi build produksi Next.js (menggunakan Turbopack):
```bash
npm run build
```

---

## 🐳 Deployment (Docker & Google Cloud Run)

Proyek ini telah dikonfigurasi untuk siap dikemas ke dalam Docker Container (*standalone output Next.js*) dan dideploy ke **Google Cloud Run**:

### 1. Build Docker Image Secara Lokal
```bash
docker build -t affiliatebrain .
```

### 2. Menjalankan Docker Container Secara Lokal
```bash
docker run -p 8080:8080 --env-file .env.local affiliatebrain
```
Akses aplikasi melalui `http://localhost:8080`.

---

## 📄 Lisensi & Dedikasi
Dibuat dengan dedikasi tinggi oleh tim pengembangan untuk membantu memberdayakan ekosistem kreator konten dan *affiliate marketer* di Indonesia. 🇮🇩✨
