import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { WilayahSummary } from '../services/wilayah.service'

@Component({
  selector: 'app-wilayah-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="select-group">
      <label>{{ label }}</label>
      <select [(ngModel)]="value" (ngModelChange)="onChange($event)">
        <option value="">{{ placeholder }}</option>
        <option *ngFor="let item of options" [value]="item.kode">{{ item.nama }}</option>
      </select>
    </div>
  `,
})
export class WilayahSelectComponent {
  @Input() label = ''
  @Input() placeholder = ''
  @Input() options: WilayahSummary[] = []
  @Input() value = ''
  @Output() selected = new EventEmitter<string>()

  onChange(val: string) {
    if (val) this.selected.emit(val)
  }
}
