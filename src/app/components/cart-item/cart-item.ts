import { Component, inject, Input } from '@angular/core';
import { SkillDTO } from '../../models/skill';
import * as CartActions from '../../store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-item',
  imports: [FontAwesomeModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  store = inject(Store);
  @Input() item: SkillDTO = new SkillDTO();
  faTrash = faTrash;

  removeFromCart(id: string) {
    this.store.dispatch(CartActions.removeFromCart({ id }));
  }
}
