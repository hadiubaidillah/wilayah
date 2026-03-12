import { Component, Input, OnChanges, AfterViewInit, ElementRef, ViewChild } from '@angular/core'
import * as L from 'leaflet'
import { WilayahData } from '../services/wilayah.service'

@Component({
  selector: 'app-wilayah-map',
  standalone: true,
  template: `<div #mapEl class="map-container"></div>`,
})
export class WilayahMapComponent implements AfterViewInit, OnChanges {
  @Input() wilayah: WilayahData | null = null
  @ViewChild('mapEl') mapEl!: ElementRef

  private map!: L.Map
  private layer: L.Layer | null = null

  ngAfterViewInit() {
    this.map = L.map(this.mapEl.nativeElement, { center: [-2.5, 118], zoom: 5 })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map)
  }

  ngOnChanges() {
    if (!this.map || !this.wilayah) return
    if (this.layer) this.map.removeLayer(this.layer)

    try {
      const coords = JSON.parse(this.wilayah.path)
      const latlngs: L.LatLngExpression[] = Array.isArray(coords[0]) && Array.isArray(coords[0][0])
        ? coords.map((ring: number[][]) => ring.map(([lat, lng]) => [lat, lng] as L.LatLngTuple))
        : coords.map(([lat, lng]: number[]) => [lat, lng] as L.LatLngTuple)

      this.layer = L.polygon(latlngs as L.LatLngExpression[], {
        color: '#3b82f6', fillColor: '#93c5fd', fillOpacity: 0.4, weight: 2,
      }).addTo(this.map)
      this.map.fitBounds((this.layer as L.Polygon).getBounds())
    } catch {
      this.map.setView([this.wilayah.lat, this.wilayah.lng], 10)
      this.layer = L.marker([this.wilayah.lat, this.wilayah.lng])
        .addTo(this.map).bindPopup(this.wilayah.nama).openPopup()
    }
  }
}
