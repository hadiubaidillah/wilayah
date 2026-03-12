import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface WilayahSummary { kode: string; nama: string }
export interface WilayahData {
  kode: string; nama: string; lat: number; lng: number
  path: string; luas: number; penduduk: number
}
export interface WilayahResponse {
  status: boolean; data: WilayahData; children: WilayahSummary[]
}

const BACKEND_KEY = 'wilayah_backend_url'
const DEFAULT_URL = 'http://localhost:8080'

export function getBackendUrl(): string {
  return localStorage.getItem(BACKEND_KEY) || DEFAULT_URL
}

export function setBackendUrl(url: string): void {
  localStorage.setItem(BACKEND_KEY, url)
}

@Injectable({ providedIn: 'root' })
export class WilayahService {
  constructor(private http: HttpClient) {}

  private get base(): string { return `${getBackendUrl()}/api` }

  getProvinsi(): Observable<WilayahSummary[]> {
    return this.http.get<WilayahSummary[]>(`${this.base}/wilayah`)
  }

  getWilayah(kode: string): Observable<WilayahResponse> {
    return this.http.get<WilayahResponse>(`${this.base}/wilayah/${kode}`)
  }
}
