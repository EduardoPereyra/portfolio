import { Component, inject, Input } from '@angular/core';
import { SkillDTO } from '../../models/skill';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faCartArrowDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Skills } from '../../services/skills';
import { Store } from '@ngrx/store';
import * as CartActions from '../../store/actions/cart.actions';

@Component({
  selector: 'app-skill-item',
  imports: [FontAwesomeModule],
  templateUrl: './skill-item.html',
  styleUrl: './skill-item.css',
})
export class SkillItem {
  store = inject(Store);

  @Input() skill: SkillDTO = new SkillDTO();
  skillsService = inject(Skills);

  faStar = faStar;
  faCartArrowDown = faCartArrowDown;
  faCheck = faCheck;
  added: boolean = false;

  showCart: boolean = false;
  hoverStars: boolean = false;

  addToCart(skill: SkillDTO) {
    // this.skillsService.addSkillToCart(skill);
    this.store.dispatch(CartActions.addToCartSuccess({ skill }));
    this.added = true;
  }
}
