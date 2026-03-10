import { Component, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartArrowDown,
  faMagnifyingGlass,
  faStore,
  faUser,
  faPhone,
  faEnvelope,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';
import { selectCartTotalSkills } from '../../store/selectors/cart.selectors';
import { form, FormField } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';

interface SearchData {
  search: string;
}

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, FormField],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  faCartArrowDown = faCartArrowDown;
  faMagnifyingGlass = faMagnifyingGlass;
  faStore = faStore;
  faUser = faUser;
  faPhone = faPhone;
  faLinkedin = faLinkedin;
  faEnvelope = faEnvelope;
  faGithub = faGithub;
  faAngleRight = faAngleRight;

  cartAmounts = signal(0);
  searchModel = signal<SearchData>({ search: '' });

  searchForm = form(this.searchModel);

  ngOnInit() {
    const searchQuery = this.route.snapshot.queryParamMap.get('search') || '';
    this.searchForm.search().value.set(searchQuery);

    this.store.select(selectCartTotalSkills).subscribe((total) => {
      if (total === 0) {
        const cart = localStorage.getItem('cart');
        if (cart) {
          const parsedCart = JSON.parse(cart);
          this.cartAmounts.set(parsedCart.length);
        }
      } else {
        this.cartAmounts.set(total);
      }
    });
  }

  handleSearch($event: Event) {
    $event.preventDefault();
    const query = this.searchForm().value();
    if (query.search.trim()) {
      this.router.navigate(['/store'], { queryParams: { search: query.search } });
    } else {
      this.router.navigate(['/store']);
    }
  }
}
