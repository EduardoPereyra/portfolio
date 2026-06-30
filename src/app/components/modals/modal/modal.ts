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

  get title(): string {
    return this.imageName
      .replace('CertificadoDeFinalizacion_', '')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .trim();
  }

  onClick() {
    this.onClose.emit();
  }
}
