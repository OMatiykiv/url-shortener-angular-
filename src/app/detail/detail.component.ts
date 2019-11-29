import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { Shortening } from '../models/shortening-response.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  href: string = "";
  id: string = "";
  shortenings: Shortening[] = [];
  
  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.href = this.router.url;
    this.id = this.href.substring(this.href.lastIndexOf('/') + 1);
    this.shortenings = this.storageService.getShortenings();
  }

  onDelete(id: string) {
    if (!confirm("Do you really want to delete this shortener")) {
      return;
    }
    this.storageService.removeShortening(id);
    this.goToShortener();
  }

  goToShortener() {
    this.router.navigate(['/shortener']);
  }
}
