import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WilayahService, WilayahSummary, WilayahData } from './services/wilayah.service'
import { WilayahSelectComponent } from './components/wilayah-select.component'
import { WilayahInfoComponent } from './components/wilayah-info.component'
import { WilayahMapComponent } from './components/wilayah-map.component'
import { AppSwitcherComponent } from './components/app-switcher.component'
import { BackendSwitcherComponent } from './components/backend-switcher.component'
import { translations, detectLang, Translations } from './i18n/translations'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WilayahSelectComponent, WilayahInfoComponent, WilayahMapComponent, AppSwitcherComponent, BackendSwitcherComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  lang = detectLang()
  get t(): Translations { return translations[this.lang] }
  toggleLang() { this.lang = this.lang === 'id' ? 'en' : 'id' }

  provinsi: WilayahSummary[] = []
  kotaList: WilayahSummary[] = []
  kecList: WilayahSummary[] = []
  desaList: WilayahSummary[] = []

  selectedProv = ''
  selectedKota = ''
  selectedKec = ''
  selectedDesa = ''

  wilayahData: WilayahData | null = null
  loading = false
  error: string | null = null

  constructor(private wilayahService: WilayahService) {}

  ngOnInit() {
    this.wilayahService.getProvinsi().subscribe({
      next: (data) => (this.provinsi = data),
      error: () => (this.error = this.t.errorProvince),
    })
  }

  handleSelect(kode: string, level: string) {
    this.error = null
    this.loading = true
    this.wilayahService.getWilayah(kode).subscribe({
      next: ({ data, children }) => {
        this.wilayahData = data
        if (level === 'prov') {
          this.selectedProv = kode
          this.kotaList = children || []
          this.selectedKota = ''
          this.kecList = []
          this.selectedKec = ''
          this.desaList = []
          this.selectedDesa = ''
        } else if (level === 'kota') {
          this.selectedKota = kode
          this.kecList = children || []
          this.selectedKec = ''
          this.desaList = []
          this.selectedDesa = ''
        } else if (level === 'kec') {
          this.selectedKec = kode
          this.desaList = children || []
          this.selectedDesa = ''
        } else if (level === 'desa') {
          this.selectedDesa = kode
        }
        this.loading = false
      },
      error: () => {
        this.error = this.t.errorRegion
        this.loading = false
      },
    })
  }
}
