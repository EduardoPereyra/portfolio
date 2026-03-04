import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-frame',
  imports: [NgOptimizedImage],
  templateUrl: './frame.html',
  styleUrl: './frame.css',
})
export class Frame {
  @Input() imageName: string = '';
  @Output() selectedCertificate = new EventEmitter<string>();

  onClick() {
    this.selectedCertificate.emit(this.imageName);
  }
}
