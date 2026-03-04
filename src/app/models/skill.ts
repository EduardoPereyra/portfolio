export class SkillDTO {
  id: string = '';
  name: string = '';
  img: string = '';
  description: string = '';
  experience: ExperienceLevel = ExperienceLevel.BEGINNER;
  level: number = 1;
  tag?: string = '';
  tagColor?: string = 'bg-gray-500';
  categories: string[] = [];
}

export enum ExperienceLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}
