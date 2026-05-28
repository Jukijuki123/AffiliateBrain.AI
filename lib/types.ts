export interface GenerationInput {
  productName: string;
  productUrl?: string;
  category: ProductCategory;
  platforms: Platform[];
  audience: AudienceType;
  tone: ToneType;
  uniquePoint?: string;
}

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
  captionShort: string;
  captionLong: string;
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
  | "remaja_wanita"
  | "remaja_pria"
  | "dewasa_wanita"
  | "dewasa_pria"
  | "ibu_rumah_tangga"
  | "mahasiswa"
  | "pekerja_kantoran"
  | "umum";
