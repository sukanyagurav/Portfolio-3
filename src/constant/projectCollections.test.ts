import assert from 'node:assert/strict';
import test from 'node:test';
import type { CustomProject } from '../types';
import {
  getCarouselProjects,
  getFeaturedProjects,
  getPracticeProjects,
} from './projectCollections';

const projects: CustomProject[] = [
  ...Array.from({ length: 8 }, (_, index) => ({
    id: index,
    name: `Carousel ${index}`,
    imageUrl: '',
    liveLink: '',
    githubLink: '',
    category: 'carousel' as const,
  })),
  {
    id: 8,
    name: 'Featured',
    imageUrl: '',
    liveLink: '',
    githubLink: '',
    category: 'featured',
  },
  {
    id: 9,
    name: 'Practice',
    imageUrl: '',
    liveLink: '',
    githubLink: '',
    category: 'practice',
  },
];

test('carousel is limited to six and excludes other project categories', () => {
  const carousel = getCarouselProjects(projects);

  assert.equal(carousel.length, 6);
  assert.ok(carousel.every((project) => project.category === 'carousel'));
  assert.ok(!carousel.some((project) => project.name === 'Featured'));
  assert.ok(!carousel.some((project) => project.name === 'Practice'));
});

test('featured and practice collections stay separate from the carousel', () => {
  assert.deepEqual(getFeaturedProjects(projects).map((project) => project.name), [
    'Featured',
  ]);
  assert.deepEqual(getPracticeProjects(projects).map((project) => project.name), [
    'Practice',
  ]);
});
