import { Component, inject, OnInit, signal } from '@angular/core';
import { SkillItem } from '../skill-item/skill-item';
import { Skills } from '../../services/skills';
import { SkillDTO } from '../../models/skill';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ModalSkillItem } from '../modals/modal-skill-item/modal-skill-item';

@Component({
  selector: 'app-skills-list',
  imports: [SkillItem, CommonModule, ModalSkillItem],
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

  selectedItem = signal<SkillDTO | null>(null);

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
      this.applyFilters();
    } else {
      this.filter.set(category);
      this.applyFilters();
    }
  }

  clearFilters() {
    this.filter.set('');
    this.searchValue.set('');
    this.applyFilters();
  }

  loadList() {
    this.skillsService.getSkills().subscribe((skills) => {
      this.items.set(skills);
      const uniqueCategories = Array.from(
        new Set(skills.flatMap((skill) => skill.categories)),
      ).sort();
      this.categories.set(uniqueCategories);
      this.applyFilters();
    });
  }

  private applyFilters() {
    const search = this.searchValue().trim().toLowerCase();
    const category = this.filter();

    this.filteredItems.set(
      this.items().filter((skill) => {
        const matchesSearch = search ? skill.name.toLowerCase().includes(search) : true;
        const matchesCategory = category ? skill.categories.includes(category) : true;
        return matchesSearch && matchesCategory;
      }),
    );
  }
}
