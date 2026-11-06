import { CustomProject } from '../types';

export const getCarouselProjects = (projects: CustomProject[]) =>
  projects.filter((project) => project.category === 'carousel').slice(0, 6);

export const getFeaturedProjects = (projects: CustomProject[]) =>
  projects.filter((project) => project.category === 'featured');

export const getPracticeProjects = (projects: CustomProject[]) =>
  projects.filter((project) => project.category === 'practice');
