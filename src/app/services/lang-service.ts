import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LangService {

  currentLang = signal<'ka' | 'en' | 'ru'>('ka');
  

  private translations = signal<Record<string, any>>({});
  
  isLoaded = signal(false);

  constructor(private http: HttpClient) {
 
  const hasSavedLang = localStorage.getItem('lang') !== null;
 
  if (!hasSavedLang) {
    localStorage.setItem('lang', 'ka');
  }

 
  const savedLang = (localStorage.getItem('lang') as 'ka' | 'en' | 'ru') || 'ka';
  
  this.currentLang.set(savedLang);
  this.loadTranslations(savedLang);
}
  setLanguage(lang: 'ka' | 'en' | 'ru') {
    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
    this.loadTranslations(lang);
  }

  loadTranslations(lang: string) {
    this.isLoaded.set(false);

    this.http.get(`/assets/i18n/${lang}.json`).subscribe({
      next: (data: any) => {
        this.translations.set(data);
        this.isLoaded.set(true);
      },
      error: (err) => {
        console.error(`Не удалось загрузить перевод для языка: ${lang}`, err);
        this.isLoaded.set(true); 
      }
    });
  }

  translate(key: string): string {
  
    const currentTranslations = this.translations();
    
    const result = key.split('.').reduce((obj: any, k: string) => obj?.[k], currentTranslations);
    
 
    return (typeof result === 'string' ? result : null) ?? key;
  }
}