export interface Translations {
  appTitle: string
  appSubtitle: string
  selectProvince: string
  selectCity: string
  selectDistrict: string
  selectVillage: string
  selectPlaceholder: (label: string) => string
  loading: string
  errorProvince: string
  errorRegion: string
  levelLabel: Record<number, string>
  infoCode: string
  infoArea: string
  infoAreaUnit: string
  infoPopulation: string
  infoPopulationUnit: string
  infoCoord: string
}

export const translations: Record<string, Translations> = {
  id: {
    appTitle: 'Data Wilayah Administrasi Indonesia',
    appSubtitle: 'Sesuai Kepmendagri No 300.2.2-2138 Tahun 2025',
    selectProvince: 'Provinsi',
    selectCity: 'Kota / Kabupaten',
    selectDistrict: 'Kecamatan',
    selectVillage: 'Desa / Kelurahan',
    selectPlaceholder: (label) => `-- Pilih ${label} --`,
    loading: 'Memuat data...',
    errorProvince: 'Gagal memuat data provinsi',
    errorRegion: 'Gagal memuat data wilayah',
    levelLabel: { 2: 'Provinsi', 5: 'Kota/Kabupaten', 8: 'Kecamatan', 13: 'Desa/Kelurahan' },
    infoCode: 'Kode',
    infoArea: 'Luas',
    infoAreaUnit: 'km²',
    infoPopulation: 'Penduduk',
    infoPopulationUnit: 'jiwa',
    infoCoord: 'Koordinat',
  },
  en: {
    appTitle: 'Indonesian Administrative Region Data',
    appSubtitle: 'Based on Kepmendagri No 300.2.2-2138 Year 2025',
    selectProvince: 'Province',
    selectCity: 'City / Regency',
    selectDistrict: 'District',
    selectVillage: 'Village / Sub-district',
    selectPlaceholder: (label) => `-- Select ${label} --`,
    loading: 'Loading data...',
    errorProvince: 'Failed to load province data',
    errorRegion: 'Failed to load region data',
    levelLabel: { 2: 'Province', 5: 'City/Regency', 8: 'District', 13: 'Village' },
    infoCode: 'Code',
    infoArea: 'Area',
    infoAreaUnit: 'km²',
    infoPopulation: 'Population',
    infoPopulationUnit: 'people',
    infoCoord: 'Coordinates',
  },
}

export function detectLang(): string {
  const lang = navigator.language || 'en'
  return lang.toLowerCase().startsWith('id') ? 'id' : 'en'
}
