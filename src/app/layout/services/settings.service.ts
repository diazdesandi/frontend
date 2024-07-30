import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  themeLink: HTMLLinkElement = document.getElementById(
    'theme',
  ) as HTMLLinkElement;

  sidebarVisible: WritableSignal<boolean> = signal(true);
  darkMode: WritableSignal<boolean> = signal(false);

  constructor() {
    const theme = localStorage.getItem('theme') || 'aura-dark-blue';
    this.themeLink.href = `assets/themes/${theme}/theme.css`;
  }

  setTheme() {
    const theme = this.themeLink.href.includes('aura-dark-blue')
      ? 'aura-light-blue'
      : 'aura-dark-blue';
    this.darkMode.update((v) => !v);
    this.themeLink.href = `assets/themes/${theme}/theme.css`;
    localStorage.setItem('theme', theme);
  }

  toggleSidebar() {
    this.sidebarVisible.update((v) => !v);
  }
}
