import { Component, inject, OnInit, signal } from '@angular/core';
import { SkillItem } from '../skill-item/skill-item';
import { Skills } from '../../services/skills';
import { SkillDTO } from '../../models/skill';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-skills-list',
  imports: [SkillItem, CommonModule],
  templateUrl: './skills-list.html',
  styleUrl: './skills-list.css',
})
export class SkillsList implements OnInit {
  skillsService = inject(Skills);

  private route = inject(ActivatedRoute);

  items = signal<SkillDTO[]>([]);
  filteredItems = signal<SkillDTO[]>([]);
  categories = signal<string[]>([]);
  filter = signal<string>('');
  searchValue = signal<string>('');

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const searchQuery = params.get('search') || '';
      this.searchValue.set(searchQuery);
      this.loadList();
    });
  }

  setFilter(category: string) {
    if (this.filter() === category) {
      this.filter.set('');
      this.filteredItems.set(this.items());
    } else {
      this.filter.set(category);
      this.filteredItems.set(this.items().filter((item) => item.categories.includes(category)));
    }
  }

  loadList() {
    this.skillsService.getSkills().subscribe((skills) => {
      this.items.set(skills);
      const uniqueCategories = Array.from(
        new Set(skills.flatMap((skill) => skill.categories)),
      ).sort();
      this.categories.set(uniqueCategories);
      if (this.searchValue()) {
        this.filteredItems.set(
          skills.filter((skill) =>
            skill.name.toLowerCase().includes(this.searchValue().toLowerCase()),
          ),
        );
      } else {
        this.filteredItems.set(skills);
      }
    });
  }
}
