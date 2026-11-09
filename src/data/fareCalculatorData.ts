// ============================================================================
// PAWCAB FARE CALCULATOR DATA (CMS-READY CONFIGURATION)
// Seluruh data di file ini dibuat terstruktur agar nantinya dapat dihubungkan
// langsung ke headless CMS (Sanity / Strapi / Supabase / JSON API).
// ============================================================================

export interface ZoneDefinition {
  id: number;
  name: string; // e.g. "Zone 1"
  areasHeadline: string; // e.g. "KOTA DENPASAR - SANUR - SEMINYAK - LEGIAN - KUTA"
  description: string;
}

export interface AreaLocation {
  id: string;
  name: string;
  zoneId: number;
  popular?: boolean;
}

// 1. DAFTAR ZONA RESMI PAWCAB
export const PAWCAB_ZONES: ZoneDefinition[] = [
  {
    id: 1,
    name: "Zone 1",
    areasHeadline: "KOTA DENPASAR - SANUR - SEMINYAK - LEGIAN - KUTA",
    description: "Pusat kota, area pesisir selatan-tengah, dan sentra wisata utama.",
  },
  {
    id: 2,
    name: "Zone 2",
    areasHeadline: "KUTA UTARA - SEMPIDI - DARMASABA - BATU BULAN",
    description: "Area Kuta Utara, Canggu, Kerobokan, dan koridor barat-tengah.",
  },
  {
    id: 3,
    name: "Zone 3",
    areasHeadline: "KUTA SELATAN - NUSA DUA",
    description: "Semenanjung bukit selatan, Jimbaran, Nusa Dua, dan Benoa.",
  },
  {
    id: 4,
    name: "Zone 4",
    areasHeadline:
      "TANAH LOT - SESEH - TABANAN (KEDIRI, KERAMBITAN) - MENGWI - ABIANSEMAL - SUKAWATI - PECATU",
    description: "Wilayah barat Tabanan, Mengwi, Gianyar barat (Sukawati), dan Pecatu.",
  },
];

// 2. DAFTAR DAERAH PER ZONA (Untuk Dropdown & Pencarian)
export const PAWCAB_AREAS: AreaLocation[] = [
  // Zone 1
  { id: "seminyak", name: "Seminyak", zoneId: 1, popular: true },
  { id: "kuta", name: "Kuta", zoneId: 1, popular: true },
  { id: "legian", name: "Legian", zoneId: 1 },
  { id: "sanur", name: "Sanur", zoneId: 1, popular: true },
  { id: "denpasar-kota", name: "Denpasar City", zoneId: 1 },
  { id: "renon", name: "Renon", zoneId: 1 },

  // Zone 2
  { id: "canggu", name: "Canggu", zoneId: 2, popular: true },
  { id: "kerobokan", name: "Kerobokan", zoneId: 2, popular: true },
  { id: "berawa", name: "Berawa Beach", zoneId: 2 },
  { id: "pererenan", name: "Pererenan", zoneId: 2 },
  { id: "dalung", name: "Dalung", zoneId: 2 },
  { id: "sempidi", name: "Sempidi", zoneId: 2 },
  { id: "darmasaba", name: "Darmasaba", zoneId: 2 },
  { id: "batubulan", name: "Batu Bulan", zoneId: 2 },

  // Zone 3
  { id: "jimbaran", name: "Jimbaran", zoneId: 3, popular: true },
  { id: "nusa-dua", name: "Nusa Dua", zoneId: 3, popular: true },
  { id: "tanjung-benoa", name: "Tanjung Benoa", zoneId: 3 },
  { id: "kuta-selatan", name: "South Kuta", zoneId: 3 },
  { id: "ungasan", name: "Ungasan", zoneId: 3 },

  // Zone 4
  { id: "tanah-lot", name: "Tanah Lot", zoneId: 4, popular: true },
  { id: "seseh", name: "Seseh", zoneId: 4 },
  { id: "tabanan-kediri", name: "Tabanan (Kediri)", zoneId: 4 },
  { id: "tabanan-kerambitan", name: "Tabanan (Kerambitan)", zoneId: 4 },
  { id: "mengwi", name: "Mengwi", zoneId: 4 },
  { id: "abiansemal", name: "Abiansemal", zoneId: 4 },
  { id: "sukawati", name: "Sukawati / South Ubud", zoneId: 4, popular: true },
  { id: "pecatu-uluwatu", name: "Pecatu / Uluwatu", zoneId: 4, popular: true },
];

// 3. TARIF PER KM ANTAR-ZONA (IDR / KM)
// Format key: `${fromZone}-${toZone}`
// Contoh: Zona 1 ke Zona 2 = 10.000 / km, Zona 1 ke Zona 3 = 9.000 / km, dsb.
export const ZONE_RATES_PER_KM: Record<string, number> = {
  // Asal Zona 1
  "1-1": 8000, // Dalam Zona 1: 8 rb / km
  "1-2": 10000, // Zona 1 -> Zona 2: 10 rb / km
  "1-3": 9000, // Zona 1 -> Zona 3: 9 rb / km
  "1-4": 12000, // Zona 1 -> Zona 4: 12 rb / km

  // Asal Zona 2
  "2-1": 10000, // Zona 2 -> Zona 1: 10 rb / km
  "2-2": 9000, // Dalam Zona 2: 9 rb / km
  "2-3": 11000, // Zona 2 -> Zona 3: 11 rb / km
  "2-4": 10000, // Zona 2 -> Zona 4: 10 rb / km

  // Asal Zona 3
  "3-1": 9000, // Zona 3 -> Zona 1: 9 rb / km
  "3-2": 11000, // Zona 3 -> Zona 2: 11 rb / km
  "3-3": 9000, // Dalam Zona 3: 9 rb / km
  "3-4": 13000, // Zona 3 -> Zona 4: 13 rb / km

  // Asal Zona 4
  "4-1": 12000, // Zona 4 -> Zona 1: 12 rb / km
  "4-2": 10000, // Zona 4 -> Zona 2: 10 rb / km
  "4-3": 13000, // Zona 4 -> Zona 3: 13 rb / km
  "4-4": 11000, // Dalam Zona 4: 11 rb / km
};

// Minimal tarif order agar driver & operasional tetap tercover
export const MINIMUM_FARE = 35000;

// 4. MATRIKS JARAK REALISTIS ANTAR DAERAH (DUMMY BALI ROUTES IN KM)
// Format key: `${fromAreaId}_${toAreaId}` (dua arah/bidirectional)
const SPECIFIC_DISTANCES: Record<string, number> = {
  // Seminyak routes
  seminyak_canggu: 9.5,
  seminyak_kuta: 5.5,
  seminyak_sanur: 14.5,
  seminyak_denpasar: 9.0,
  seminyak_jimbaran: 13.5,
  seminyak_nusa_dua: 22.0,
  seminyak_tanah_lot: 19.5,
  seminyak_sukawati: 27.0,
  seminyak_pecatu_uluwatu: 28.5,
  seminyak_kerobokan: 4.2,

  // Canggu routes
  canggu_kuta: 14.0,
  canggu_sanur: 21.0,
  canggu_denpasar: 15.0,
  canggu_jimbaran: 23.0,
  canggu_nusa_dua: 31.0,
  canggu_tanah_lot: 12.0,
  canggu_seseh: 6.5,
  canggu_pererenan: 3.5,
  canggu_sukawati: 26.5,
  canggu_pecatu_uluwatu: 35.0,

  // Sanur routes
  sanur_kuta: 13.5,
  sanur_denpasar: 7.5,
  sanur_jimbaran: 18.0,
  sanur_nusa_dua: 20.5,
  sanur_sukawati: 18.0,
  sanur_tanah_lot: 29.0,
  sanur_pecatu_uluwatu: 32.0,

  // Kuta routes
  kuta_jimbaran: 9.5,
  kuta_nusa_dua: 16.5,
  kuta_denpasar: 10.0,
  kuta_tanah_lot: 23.5,
  kuta_pecatu_uluwatu: 24.0,

  // Jimbaran & Nusa Dua routes
  jimbaran_nusa_dua: 11.0,
  jimbaran_pecatu_uluwatu: 15.0,
  nusa_dua_pecatu_uluwatu: 21.0,

  // Tanah Lot & Tabanan routes
  tanah_lot_tabanan_kediri: 11.5,
  tanah_lot_mengwi: 16.0,
  tanah_lot_sukawati: 33.0,
};

// Default jarak rata-rata antar zona (jika pasangan spesifik belum didefinisikan)
const DEFAULT_ZONE_DISTANCES: Record<string, number> = {
  "1-1": 6.5,
  "1-2": 11.5,
  "1-3": 17.5,
  "1-4": 26.0,

  "2-1": 11.5,
  "2-2": 7.0,
  "2-3": 24.5,
  "2-4": 19.0,

  "3-1": 17.5,
  "3-2": 24.5,
  "3-3": 8.0,
  "3-4": 32.0,

  "4-1": 26.0,
  "4-2": 19.0,
  "4-3": 32.0,
  "4-4": 10.5,
};

// 5. HELPER FUNCTIONS
export function getRatePerKm(fromZone: number, toZone: number): number {
  const key = `${fromZone}-${toZone}`;
  return ZONE_RATES_PER_KM[key] ?? 10000;
}

export function getEstimatedDistance(fromAreaId: string, toAreaId: string): number {
  if (fromAreaId === toAreaId) {
    return 3.0; // Perjalanan lokal dalam satu kelurahan/desa
  }

  // Cek key arah A -> B
  const keyA = `${fromAreaId.replace(/-/g, "_")}_${toAreaId.replace(/-/g, "_")}`;
  if (SPECIFIC_DISTANCES[keyA] !== undefined) {
    return SPECIFIC_DISTANCES[keyA];
  }

  // Cek key arah B -> A
  const keyB = `${toAreaId.replace(/-/g, "_")}_${fromAreaId.replace(/-/g, "_")}`;
  if (SPECIFIC_DISTANCES[keyB] !== undefined) {
    return SPECIFIC_DISTANCES[keyB];
  }

  // Fallback berdasarkan zona
  const fromArea = PAWCAB_AREAS.find((a) => a.id === fromAreaId);
  const toArea = PAWCAB_AREAS.find((a) => a.id === toAreaId);

  const fromZone = fromArea ? fromArea.zoneId : 1;
  const toZone = toArea ? toArea.zoneId : 1;

  const zoneKey = `${fromZone}-${toZone}`;
  return DEFAULT_ZONE_DISTANCES[zoneKey] ?? 12.0;
}

export function calculateFare(
  fromAreaId: string,
  toAreaId: string
): {
  distanceKm: number;
  fromZone: number;
  toZone: number;
  ratePerKm: number;
  subtotal: number;
  finalFare: number;
  isMinimumApplied: boolean;
} {
  const fromArea = PAWCAB_AREAS.find((a) => a.id === fromAreaId) || PAWCAB_AREAS[0];
  const toArea = PAWCAB_AREAS.find((a) => a.id === toAreaId) || PAWCAB_AREAS[6]; // default Canggu

  const distanceKm = getEstimatedDistance(fromArea.id, toArea.id);
  const ratePerKm = getRatePerKm(fromArea.zoneId, toArea.zoneId);

  const rawFare = distanceKm * ratePerKm;
  // Dibulatkan ke ribuan terdekat
  const subtotal = Math.round(rawFare / 1000) * 1000;
  const finalFare = Math.max(subtotal, MINIMUM_FARE);
  const isMinimumApplied = subtotal < MINIMUM_FARE;

  return {
    distanceKm,
    fromZone: fromArea.zoneId,
    toZone: toArea.zoneId,
    ratePerKm,
    subtotal,
    finalFare,
    isMinimumApplied,
  };
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

