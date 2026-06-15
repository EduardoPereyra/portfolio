import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SkillDTO } from '../../../models/skill';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-modal-skill-item',
  imports: [NgOptimizedImage, FontAwesomeModule],
  templateUrl: './modal-skill-item.html',
  styleUrl: './modal-skill-item.css',
})
export class ModalSkillItem {
  @Input() item: SkillDTO = new SkillDTO();
  @Output() onClose = new EventEmitter<void>();

  hoverStars: boolean = false;
  faStar = faStar;

  onClick() {
    this.onClose.emit();
  }
}
