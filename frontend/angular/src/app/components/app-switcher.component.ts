import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

interface AppEntry { id: string; name: string; url: string }

@Component({
  selector: 'app-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <select class="app-switcher" [(ngModel)]="currentId" (ngModelChange)="navigate($event)">
      <option *ngFor="let a of apps" [value]="a.id">{{ a.name }}</option>
    </select>
  `,
})
export class AppSwitcherComponent implements OnInit {
  apps: AppEntry[] = []
  currentId = ''

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ apps: AppEntry[] }>('/assets/apps.config.json').subscribe((cfg) => {
      this.apps = cfg.apps
      this.currentId = cfg.apps.find(
        (a) => a.url === `${location.protocol}//${location.host}`
      )?.id ?? 'angular'
    })
  }

  navigate(id: string) {
    const app = this.apps.find((a) => a.id === id)
    if (app) window.location.href = app.url
  }
}
