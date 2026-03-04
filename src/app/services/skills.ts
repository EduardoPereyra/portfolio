import { inject, Injectable } from '@angular/core';
import { SkillDTO } from '../models/skill';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class Skills {
  http = inject(HttpClient);

  private cart: SkillDTO[] = [];

  getSkills(): Observable<SkillDTO[]> {
    return this.http
      .get<{ skills: SkillDTO[] }>('../assets/json/skills.json')
      .pipe(map((data) => data.skills));
  }

  addSkillToCart(skill: SkillDTO) {
    if (!this.cart.includes(skill)) {
      this.cart.push(skill);
    } else {
      alert('Skill already in cart');
    }
  }
}
