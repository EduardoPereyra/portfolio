import { Component, inject, OnInit, signal } from '@angular/core';
import { email, form, required, pattern, max, FormField } from '@angular/forms/signals';
import { Observable } from 'rxjs/internal/Observable';
import { SkillDTO } from '../../models/skill';
import { Store } from '@ngrx/store';
import * as CartSelectors from '../../store/selectors/cart.selectors';
import * as CartActions from '../../store/actions/cart.actions';
import { AsyncPipe } from '@angular/common';
import { CartItem } from '../cart-item/cart-item';

interface ContactData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, CartItem, FormField],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  store = inject(Store);

  items$: Observable<SkillDTO[]> = this.store.select(CartSelectors.selectCartSkills);
  loading$: Observable<boolean> = this.store.select(CartSelectors.selectCartLoading);
  error$: Observable<string | null> = this.store.select(CartSelectors.selectCartError);
  totalItems$: Observable<number> = this.store.select(CartSelectors.selectCartTotalSkills);

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
    // Get form data
    let cart: SkillDTO[] = [];
    const name = this.contactForm.fullName().value();
    const email = this.contactForm.email().value();
    const phone = this.contactForm.phone().value();
    const company = this.contactForm.company().value();
    const message = this.contactForm.notes().value();

    // Subscribe to get the cart data
    this.items$.subscribe((items) => {
      cart = items;
    });

    // Format the cart items for email
    const techList = cart.map((tech) => `• ${tech.name}`).join('\n');

    // Build the email body
    const emailBody = `
New Project Request from ${name}
${'-'.repeat(40)}

CONTACT INFORMATION:
  Name: ${name}
  Email: ${email}
  Phone: ${phone}
  Company: ${company}

  ${message ? `\NOTES:\n${message}` : ''}

${'-'.repeat(40)}
SELECTED TECHNOLOGIES:
${techList}

Total technologies selected: ${cart.length}
${'-'.repeat(40)}

This request was sent from my interactive portfolio shop.
        `.trim();

    const subject = encodeURIComponent(`Project Request from ${name}`);
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:eduardo.pereyrayraola@gmail.com?subject=${subject}&body=${body}`;

    location.href = mailtoLink;

    this.clearCart();
    // this.contactForm.reset();
  }
}
