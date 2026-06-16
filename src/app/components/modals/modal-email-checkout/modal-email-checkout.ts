import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SnackbarInfo } from '../../../models/snackbar';
import { Email } from '../../../models/email';

@Component({
  selector: 'app-modal-email-checkout',
  imports: [],
  templateUrl: './modal-email-checkout.html',
  styleUrl: './modal-email-checkout.css',
})
export class ModalEmailCheckout {
  @Input() checkoutEmail: Email | null = null;
  @Output() onClose = new EventEmitter<SnackbarInfo>();

  onClick(type?: string, message?: string) {
    this.onClose.emit({ type: type, message: message });
  }

  copyToClipboard($event: Event) {
    if (this.checkoutEmail) {
      navigator.clipboard.writeText(this.checkoutEmail.body);
      this.onClick('success', 'URL copy to clipboard');
    }
  }

  sendByEmail($event: Event) {
    if (this.checkoutEmail) {
      const subject = encodeURIComponent(this.checkoutEmail.subject);
      const body = encodeURIComponent(this.checkoutEmail.body);
      const mailToLink = `mailto:eduardo.pereyrayraola@gmail.com?subject=${subject}&body=${body}`;
      location.href = mailToLink;
      this.onClick('info', 'Opening Email App');
    }
  }
}
