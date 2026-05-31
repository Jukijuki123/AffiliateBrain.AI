import { FirebaseError } from "firebase/app";

export function getFirebaseErrorMessage(error: FirebaseError): string {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Email ini sudah terdaftar. Silakan login atau gunakan email lain.";
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/weak-password":
      return "Password terlalu lemah. Minimal 6 karakter.";
    case "auth/user-not-found":
      return "Email tidak ditemukan. Cek kembali atau daftar akun baru.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email atau password salah. Silakan coba lagi.";
    case "auth/too-many-requests":
      return "Terlalu banyak percobaan. Coba lagi beberapa saat.";
    case "auth/popup-closed-by-user":
      return "Login Google dibatalkan.";
    case "auth/network-request-failed":
      return "Koneksi internet bermasalah. Periksa jaringan Anda.";
    default:
      return "Terjadi kesalahan. Silakan coba lagi.";
  }
}
