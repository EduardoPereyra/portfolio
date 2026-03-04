declare var require: any;
import { Component, inject, OnInit, signal } from '@angular/core';
import { Frame } from '../frame/frame';
import { HttpClient } from '@angular/common/http';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-home',
  imports: [Frame, Modal],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  http = inject(HttpClient);

  images = signal<string[]>([]);
  selectedCertificate = signal<string | null>(null);

  ngOnInit() {
    this.importAllImages();
  }

  importAllImages() {
    this.http.get<string[]>('assets/certificates/certificates.json').subscribe({
      next: (imageNames) => {
        this.images.set(imageNames);
      },
      error: (error) => {
        console.error('Could not load image list:', error);
      },
    });
  }
}
