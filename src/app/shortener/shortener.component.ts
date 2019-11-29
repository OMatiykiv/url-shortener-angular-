import { Component, OnInit } from '@angular/core';
import { ShortenerApiService } from '../shortener-api.service';
import { StorageService } from '../storage.service';
import { Shortening } from '../models/shortening-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shortener',
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent implements OnInit {
  name: string = '';
  url: string = '';
  search: string = ''
  shortenings: Shortening[] = [];

  constructor(
    private shortAPI: ShortenerApiService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updateShortenings();
  }

  onSubmit() {
    if (!this.url || !this.name) {
      return;
    }

    this.shortAPI.shortenUrl(this.url).subscribe((res) => {
      res.result.name = this.name;
      this.storageService.saveShortening(res.result);
      this.updateShortenings();
    });
  }

  onDelete(id: string) {
    if (!confirm("Do you really want to delete this shortener")) {
      return;
    }
    this.storageService.removeShortening(id);
    this.updateShortenings();
  }

  updateShortenings() {
    this.shortenings = this.storageService.getShortenings();
  }

  goTo(short: Shortening) {
    this.router.navigate(['/shortener', short.code]);
  }

  searching(short: Shortening) {
    if (!this.search){
      return true;
    }
    return (short.name.includes(this.search) || short.code.includes(this.search) || short.original_link.includes(this.search))
  }
}


