# Laporan Analisis Kode: AffiliateBrain.AI (Versi MVP 1.0)
**Tanggal:** 28 Mei 2026  
**Analis:** Antigravity AI  
**Status Proyek:** MVP Sprint 7 Hari — Siap Dijalankan (Dependencies Terinstal)

---

## 1. Penjelasan Proyek / Website

**AffiliateBrain.AI** adalah sebuah platform berbasis web yang dirancang khusus sebagai asisten cerdas bagi *affiliate marketer* di Indonesia. Fokus utamanya adalah membantu para kreator konten menghasilkan **strategi pemasaran (blueprint) dan naskah/skrip video pendek siap pakai** secara instan untuk platform TikTok Shop, Shopee Video, dan Instagram Reels.

### Keunggulan Positioning:
Berbeda dengan asisten AI generik (seperti ChatGPT standar) yang memberikan respons kaku dan formal, AffiliateBrain.AI dirancang dengan pemahaman mendalam tentang lanskap digital lokal Indonesia:
*   **Konteks Budaya & E-Commerce Lokal:** Paham istilah seperti BPOM, COD, keranjang kuning/orange, diskon kilat, gratis ongkir, dll.
*   **Bahasa Gaul Mode (Gen-Z & Santai):** Mampu merumuskan naskah menggunakan dialek percakapan sehari-hari dan slang populer (Cth: *bestie, gaskeun, auto, worth it, no cap, spill, glow up*).
*   **Platform-Specific Output:** Durasi naskah dan fokus disesuaikan dengan platform tujuan (TikTok: ekspresif/cepat; Shopee Video: fokus demo & promosi; Reels: visual & emosional).

### Arsitektur Teknis:
*   **Frontend & Server-Side:** Next.js 16.2.6 (App Router) menggunakan Node.js 18+.
*   **Styling System:** Tailwind CSS v4 dengan sistem variabel tema kustom (`globals.css`) untuk palet warna premium.
*   **Layanan Database:** Cloud Firestore untuk penyimpanan riwayat generasi naskah.
*   **Sistem Autentikasi:** Firebase Authentication dengan Google Sign-In sebagai metode masuk utama serta Email/Password.
*   **AI Engine:** Google Gemini API (model `gemini-flash-lite-latest` via `@google/generative-ai`) dengan output format JSON terstruktur.
*   **Containerization:** Dilengkapi dengan Dockerfile untuk deployment siap pakai ke Google Cloud Run.

---

## 2. Analisis Fitur-Fitur Aplikasi

Berdasarkan penelusuran seluruh file di direktori, berikut adalah detail fungsionalitas fitur yang telah diimplementasikan:

1.  **Landing Page (`app/page.tsx`):**
    *   Tampilan kelas atas (premium) dengan latar belakang grid modern, ambient light glow, headline memikat, demonstrasi 3 langkah cara kerja dengan indikator warna-warni, bagian testimonial bintang lima, kartu pratinjau interaktif (*HeroPreviewCard*), dan tombol ajakan aksi (CTA) yang menonjol.
2.  **Sistem Autentikasi (`app/(auth)/login/page.tsx`):**
    *   Halaman masuk yang indah dengan tab switcher (Segmented Control) dinamis antara "Masuk" dan "Daftar".
    *   Dukungan penuh Google Sign-In terintegrasi dan sistem login/registrasi dengan Email & Password konvensional.
    *   Penanganan kesalahan Firebase (`FirebaseError`) yang diterjemahkan ke dalam Bahasa Indonesia yang ramah pengguna.
    *   Fitur "Lupa Password" yang mengirimkan email pemulihan langsung ke pengguna.
3.  **Onboarding Flow (`app/(main)/onboarding/page.tsx` & `components/layout/OnboardingModal.tsx`):**
    *   Menyediakan pengalaman edukasi 3-langkah bagi pengguna baru (Visi -> Cara Kerja -> Potensi FYP) menggunakan slide/langkah interaktif dengan ilustrasi ikon SVG yang tajam.
    *   Mengubah status `onboardingDone: true` di database Firestore setelah diselesaikan agar tidak muncul kembali.
4.  **Product Form (`components/form/ProductForm.tsx` & `/generate`):**
    *   Formulir input utama yang bersih dan terstruktur rapi. Mengumpulkan parameter: Nama Produk, Link Produk (Opsional), Kategori Produk (dropdown), Target Platform (multi-select), Target Pembeli (dropdown), Poin Keunikan (textarea), dan Nada Bicara (Pill Button: Formal / Santai / Gen-Z).
    *   Dilengkapi dengan validasi sisi klien (client-side validation) untuk memastikan seluruh parameter wajib diisi.
    *   Efek visual *loading state* dinamis pada tombol: menonaktifkan input dan memutar pesan humoris yang relevan setiap 2 detik (Cth: *"Lagi mikirin hook yang gak bisa di-skip..."*, *"Mastiin CTA-nya bikin orang langsung klik..."*).
5.  **AI Engine & Prompt Generator (`lib/gemini.ts` & `lib/prompts.ts`):**
    *   Menyatukan input pengguna ke dalam instruksi sistem (*system prompt*) yang sangat ketat untuk menghasilkan struktur JSON valid dengan schema yang baku.
    *   Memaksa output bertipe JSON murni menggunakan konfigurasi `responseMimeType: "application/json"`.
    *   Memiliki mekanisme ketahanan kegagalan berupa **Retry Logic** otomatis (mencoba kembali hingga 2 kali jika koneksi gagal atau JSON rusak).
6.  **Halaman Hasil (`app/(main)/result/[id]/page.tsx`):**
    *   **Strategy Blueprint:** Memaparkan target audiens, pain point, dan keunggulan produk.
    *   **Angle Roulette:** UI inovatif berupa horizontal scroller card yang menampilkan 5 sudut pandang (FOMO, Testimoni, Edukasi, Komedi, Before-After). Pengguna dapat mengklik salah satu kartu angle untuk mengubah naskah teleprompter secara instan.
    *   **Script Block (Teleprompter style):** Naskah dipisahkan menjadi 3 segmen dengan label warna yang tegas (Merah: Hook 0-3s, Teal: Body/Alur, Oranye: CTA) lengkap dengan tombol salin mandiri untuk tiap bagian.
    *   **Copywriting Assets (`CopywritingAssets.tsx`):** Menyediakan aset caption pendek (untuk video), caption panjang (deskripsi produk), dan sekumpulan hashtag viral yang dikelompokkan secara teratur.
    *   **Interaksi Salin Hashtag Individual:** Pengguna dapat menyalin hashtag tertentu secara instan hanya dengan mengkliknya sekali (dilengkapi feedback visual `"✓ Tersalin!"`).
7.  **Riwayat Strategi (`app/(main)/history/page.tsx`):**
    *   Mengambil maksimal 10 dokumen riwayat terakhir pengguna dari Firestore, diurutkan berdasarkan waktu terbaru.
    *   Menyediakan filter pencarian instan berbasis teks untuk mencari nama produk dalam riwayat.
    *   Menampilkan pratinjau kutipan naskah (*hook excerpt*) secara visual dalam kotak ringkas.
    *   Menyediakan tombol "Hapus" dengan dialog konfirmasi, serta navigasi cepat kembali ke halaman hasil generasi.

---

## 3. Evaluasi Progress Saat Ini

Proyek saat ini telah menyelesaikan seluruh target esensial dari Sprint 7 Hari:
*   **Infrastruktur & Modul:** 100% dari core modules (Hari 1 hingga Hari 6) telah diimplementasikan dengan sangat rapi dan lengkap!
*   **Instalasi Dependensi:** Dependensi proyek (Next.js, React 19, Firebase, Google Gen AI SDK) telah diunduh sepenuhnya melalui `npm install`.
*   **Struktur Folder:** Mengikuti pedoman arsitektur clean-code modular Next.js (App Router) secara tepat.
*   **Aset Visual & Styling:** globals.css telah dipoles dengan Tailwind CSS v4, mengimplementasikan token warna yang harmonis (solid teal & coral, ambient lights, clean-borders) sehingga bebas dari tampilan placeholder kaku.

---

## 4. Kekurangan & Celah yang Perlu Diperbaiki

Meskipun secara fungsionalitas dan desain proyek ini sudah sangat baik, terdapat beberapa celah arsitektur dan kegunaan (usability) yang perlu diantisipasi:

### A. Celah Keamanan & Arsitektur
1.  **Fallback Inisialisasi Firebase Client (`lib/firebase.ts`):**
    *   *Kondisi Saat Ini:* Jika `NEXT_PUBLIC_FIREBASE_API_KEY` tidak disetel (misalnya saat proses build awal Next.js), kode akan menginisialisasi mock app `{ name: "[DEFAULT]" } as any` dan menyetel `auth = null as any` serta `db = null as any`.
    *   *Risiko:* Ketika aplikasi berjalan di browser dan komponen mencoba memanggil `auth.currentUser` atau `getFirestore()`, browser akan mengalami crash fatal (*Unhandled Runtime Exception: Cannot read properties of null*) karena tidak ada pemeriksaan apakah instansi auth/db bernilai null sebelum diakses.
2.  **Ketergantungan Kritis Variabel Firebase Admin (`lib/firebase-admin.ts`):**
    *   *Kondisi Saat Ini:* Endpoint `/api/generate` mewajibkan token verifikasi dari client. Inisialisasi Firebase Admin dilakukan secara dinamis menggunakan variabel lingkungan server (`FIREBASE_ADMIN_PROJECT_ID`, dsb).
    *   *Risiko:* Jika variabel-variabel tersebut belum di-setup di environment Cloud Run, API akan langsung melempar error crash 500. Sebaiknya ada log peringatan yang lebih anggun di konsol server tanpa menghentikan seluruh request jika tidak terhindarkan.
3.  **Pengabaian Error Kompilasi TypeScript saat Build (`next.config.ts`):**
    *   *Kondisi Saat Ini:* Konfigurasi `ignoreBuildErrors: true` diaktifkan di file konfigurasi Next.js.
    *   *Risiko:* Meskipun mempercepat proses pengiriman produk pertama kali, pengabaian ini berpotensi meloloskan kesalahan tipe data (*type mismatch*) yang kritis ke server produksi, yang baru terdeteksi saat crash terjadi di tangan pengguna.

### B. Keterbatasan Fitur MVP
1.  **Scraping URL Marketplace Belum Aktif (F-01/v2):**
    *   *Kondisi Saat Ini:* Input URL produk dikumpulkan oleh form dan dikirimkan ke prompt Gemini sebagai teks mentah. Namun, belum ada engine parser di backend (`/api/generate/route.ts`) untuk mengambil informasi deskripsi produk secara dinamis dari tautan Shopee/TikTok Shop tersebut.
2.  **Rekomendasi Waktu Posting Bersifat Statis (`components/result/TimingCard.tsx`):**
    *   *Kondisi Saat Ini:* Data waktu upload dipaparkan secara statis dari schema output AI. Ke depan, fitur ini akan lebih bernilai tinggi jika dihubungkan dengan analisis tren live di Indonesia atau pola unggah akun pengguna itu sendiri.

---

## 5. Rating & Kritik

### **RATING: 9.3 / 10** ⭐⭐⭐⭐⭐ (Luar Biasa / Premium MVP)

### Kritik & Apresiasi:

*   **Apresiasi Besar (Arsitektur):**
    *   Arsitektur penanganan inisialisasi Firebase Admin server-side menggunakan **Lazy-loaded Proxy** (`lib/firebase-admin.ts`) adalah teknik yang **sangat cerdas dan profesional**. Cara ini berhasil mencegah Next.js mengalami kegagalan crash saat build phase (`phase-production-build`) di mana variabel server-side belum tersedia.
    *   Skema data Firestore terstruktur dengan sangat rapi (menggunakan sub-koleksi di bawah pengguna `users/{uid}/generations/{id}`) yang menjamin keamanan data antar-pengguna secara optimal melalui aturan aturan Firestore yang tepat.
*   **Apresiasi Besar (Desain & UI/UX):**
    *   Pengalaman pengguna (UX) dirancang dengan dedikasi tinggi. Transisi loading state yang menghibur, skema teleprompter naskah video, hingga micro-interaction berupa penyalinan satu baris hashtag dengan sekali klik adalah standar desain web modern tingkat lanjut.
*   **Saran Pengembangan (Kritik Konstruktif):**
    *   **Fallback Validasi JSON AI:** Walau Gemini dikonfigurasi menggunakan `responseMimeType: "application/json"`, ada kalanya model AI mengembalikan teks di luar ekspektasi (misal jika dibatasi filter keamanan/safety). Disarankan menambahkan parser pembersihan regex yang lebih tangguh sebelum melakukan `JSON.parse` pada `lib/gemini.ts`.
    *   **Penyelarasan Tipe Data:** Pastikan untuk menonaktifkan `ignoreBuildErrors: true` secara bertahap setelah tipe data TypeScript di seluruh aplikasi diselaraskan 100%, demi menjaga stabilitas kode jangka panjang.

---
*Laporan ini disimpan sebagai dokumentasi resmi evaluasi kode AffiliateBrain.AI MVP.*
