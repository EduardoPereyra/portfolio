import { Component, inject, OnInit, signal } from '@angular/core';
import { email, form, required, pattern, max, FormField } from '@angular/forms/signals';
import { Observable, take } from 'rxjs';
import { SkillDTO } from '../../models/skill';
import { Store } from '@ngrx/store';
import * as CartSelectors from '../../store/selectors/cart.selectors';
import * as CartActions from '../../store/actions/cart.actions';
import { AsyncPipe } from '@angular/common';
import { CartItem } from '../cart-item/cart-item';
import { ModalEmailCheckout } from '../modals/modal-email-checkout/modal-email-checkout';
import { Snackbar } from '../../util/snackbar/snackbar';
import { SnackbarInfo } from '../../models/snackbar';
import { Email } from '../../models/email';

interface ContactData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, CartItem, FormField, ModalEmailCheckout, Snackbar],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  store = inject(Store);
  signal = signal;

  items$: Observable<SkillDTO[]> = this.store.select(CartSelectors.selectCartSkills);
  loading$: Observable<boolean> = this.store.select(CartSelectors.selectCartLoading);
  error$: Observable<string | null> = this.store.select(CartSelectors.selectCartError);
  totalItems$: Observable<number> = this.store.select(CartSelectors.selectCartTotalSkills);

  checkoutEmail = signal<Email | null>(null);

  showMessage = signal<SnackbarInfo | null>(null);

  contactModel = signal<ContactData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  contactForm = form(this.contactModel, (c) => {
    required(c.fullName, { message: 'Full Name is required' });
    required(c.email, { message: 'Email is required' });
    email(c.email, { message: 'Please enter a valid email address' });
    required(c.phone, { message: 'Phone Number is required' });
    pattern(c.phone, /^\+?[1-9]\d{1,14}$/, { message: 'Please enter a valid phone number' });
    required(c.company, { message: 'Company is required' });
    max(c.notes, 3300, { message: 'Notes cannot exceed 500 words' });
  });

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }

  handleCheckout($event: Event) {
    $event.preventDefault();
    if (this.contactForm().invalid()) {
      this.contactForm().markAsTouched();
      return;
    }
    const name = this.contactForm.fullName().value();
    const contactEmail = this.contactForm.email().value();
    const phone = this.contactForm.phone().value();
    const company = this.contactForm.company().value();
    const message = this.contactForm.notes().value();

    this.items$.pipe(take(1)).subscribe((cart) => {
      const techList = cart.map((tech) => `• ${tech.name}`).join('\n');
      const emailBody = `
New Project Request from ${name}
${'-'.repeat(40)}

CONTACT INFORMATION:
  Name: ${name}
  Email: ${contactEmail}
  Phone: ${phone}
  Company: ${company}

  ${message ? `NOTES:\n${message}` : ''}

${'-'.repeat(40)}
SELECTED TECHNOLOGIES:
${techList}

Total technologies selected: ${cart.length}
${'-'.repeat(40)}

This request was sent from my interactive portfolio shop.
        `.trim();

      this.checkoutEmail.set({
        subject: `Project Request from ${name}`,
        body: emailBody,
      });
    });
  }

  onCloseModal(snackbarInfo: SnackbarInfo) {
    this.checkoutEmail.set(null);
    this.showMessage.set({
      message: snackbarInfo.message,
      type: snackbarInfo.type,
    } as SnackbarInfo);
    if (snackbarInfo.message) {
      this.clearCart();
      this.contactModel.set({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
      });
    }
  }
}
