import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [NgOptimizedImage],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @Input() imageName: string = '';
  @Output() onClose = new EventEmitter<void>();

  onClick() {
    this.onClose.emit();
  }
}
