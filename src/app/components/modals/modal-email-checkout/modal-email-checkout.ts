import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SnackbarInfo } from '../../../models/snackbar';

@Component({
  selector: 'app-modal-email-checkout',
  imports: [],
  templateUrl: './modal-email-checkout.html',
  styleUrl: './modal-email-checkout.css',
})
export class ModalEmailCheckout {
  @Input() url: string = '';
  @Output() onClose = new EventEmitter<SnackbarInfo>();

  onClick(type?: string, message?: string) {
    this.onClose.emit({ type: type, message: message });
  }

  copyToClipboard($event: Event) {
    navigator.clipboard.writeText(this.url);
    this.onClick('success', 'URL copy to clipboard');
  }

  sendByEmail($event: Event) {
    location.href = this.url;
    this.onClick('info', 'Opening Email App');
  }
}
