import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WilayahData } from '../services/wilayah.service'
import { Translations } from '../i18n/translations'

@Component({
  selector: 'app-wilayah-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wilayah-info" *ngIf="data">
      <h3>{{ levelLabel }}: {{ data.nama }}</h3>
      <table>
        <tbody>
          <tr><td>{{ t.infoCode }}</td><td>{{ data.kode }}</td></tr>
          <tr *ngIf="data.luas">
            <td>{{ t.infoArea }}</td>
            <td>{{ data.luas.toLocaleString() }} {{ t.infoAreaUnit }}</td>
          </tr>
          <tr *ngIf="data.penduduk">
            <td>{{ t.infoPopulation }}</td>
            <td>{{ data.penduduk.toLocaleString() }} {{ t.infoPopulationUnit }}</td>
          </tr>
          <tr><td>{{ t.infoCoord }}</td><td>{{ data.lat }}, {{ data.lng }}</td></tr>
        </tbody>
      </table>
    </div>
  `,
})
export class WilayahInfoComponent {
  @Input() data!: WilayahData
  @Input() t!: Translations

  get levelLabel(): string {
    return this.t?.levelLabel?.[this.data?.kode?.length] ?? 'Wilayah'
  }
}
