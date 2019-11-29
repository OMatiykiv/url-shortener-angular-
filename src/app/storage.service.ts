import { Injectable } from '@angular/core';
import { Shortening } from './models/shortening-response.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  shortenings: Shortening[] = [];

  constructor() {
    this.shortenings = this.getShortenings();
  }

  saveShortening(shortening: Shortening): void {
    this.shortenings.push(shortening);
    this.updateStorage(this.shortenings);
  }

  removeShortening(id: string) {
    for (let shorten of this.shortenings) {
      if (shorten.code === id) {
        this.shortenings.splice(this.shortenings.indexOf(shorten), 1);
        this.updateStorage(this.shortenings);
      } 
    }
  }

  getShortenings(): Shortening[] {
    const shorteningsString = localStorage.getItem('shortenings');

    if (!shorteningsString) {
      return [];
    }

    try {
      return JSON.parse(shorteningsString);
    } catch {
      return [];
    }
  }

  updateStorage(shortenings: Shortening[]): void {
    localStorage.setItem('shortenings', JSON.stringify(shortenings));
  }
}
