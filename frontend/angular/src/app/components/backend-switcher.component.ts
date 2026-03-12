import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { getBackendUrl, setBackendUrl } from '../services/wilayah.service'

interface BackendEntry { id: string; name: string; url: string }

@Component({
  selector: 'app-backend-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <select class="backend-switcher" [(ngModel)]="currentId" (ngModelChange)="navigate($event)">
      <option *ngFor="let b of backends" [value]="b.id">{{ b.name }}</option>
    </select>
  `,
})
export class BackendSwitcherComponent implements OnInit {
  backends: BackendEntry[] = []
  currentId = ''

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ backends: BackendEntry[] }>('/assets/apps.config.json').subscribe((cfg) => {
      this.backends = cfg.backends
      const currentUrl = getBackendUrl()
      this.currentId = cfg.backends.find((b) => b.url === currentUrl)?.id ?? cfg.backends[0].id
    })
  }

  navigate(id: string) {
    const backend = this.backends.find((b) => b.id === id)
    if (backend) {
      setBackendUrl(backend.url)
      window.location.reload()
    }
  }
}
