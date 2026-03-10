import { Routes } from '@angular/router';
import { SkillsList } from './components/skills-list/skills-list';
import { Cart } from './components/cart/cart';
import { Home } from './components/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'store',
    component: SkillsList,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
