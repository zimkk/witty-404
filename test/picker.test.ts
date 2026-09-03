import { describe, it, expect } from 'vitest';
import { pickJoke } from '../src/index';
import { Joke } from '../src/jokes';

const mockJokes: Joke[] = [
  {
    id: 'joke-a',
    title: 'Joke A Title',
    subtitle: 'Joke A Subtitle',
    logs: ['> log 1', '> log 2', '> log 3', '> log 4', '> log 5', '> log 6'],
    footnote: 'Footnote A',
    emoji: '🅰️',
    tags: ['deploy', 'infra'],
  },
  {
    id: 'joke-b',
    title: 'Joke B Title',
    subtitle: 'Joke B Subtitle',
    logs: ['> log 1', '> log 2', '> log 3', '> log 4', '> log 5', '> log 6'],
    footnote: 'Footnote B',
    emoji: '🅱️',
    tags: ['git', 'refactor'],
  },
  {
    id: 'joke-c',
    title: 'Joke C Title',
    subtitle: 'Joke C Subtitle',
    logs: ['> log 1', '> log 2', '> log 3', '> log 4', '> log 5', '> log 6'],
    footnote: 'Footnote C',
    emoji: '🅲',
    tags: ['security'],
  },
];

describe('pickJoke logic', () => {
  it('picks a specific joke by valid id', () => {
    const picked = pickJoke(mockJokes, undefined, 'joke-b', undefined);
    expect(picked.id).toBe('joke-b');
  });

  it('falls back to random without crashing when id is unknown', () => {
    const picked = pickJoke(mockJokes, undefined, 'non-existent-id-999', undefined);
    expect(picked).toBeDefined();
    expect(mockJokes.some(j => j.id === picked.id)).toBe(true);
  });

  it('picks reproducibly when valid base-36 seed is provided', () => {
    const pick1 = pickJoke(mockJokes, 'abc', undefined, undefined);
    const pick2 = pickJoke(mockJokes, 'abc', undefined, undefined);
    expect(pick1.id).toBe(pick2.id);
  });

  it('falls back to random without crashing when seed is invalid / NaN', () => {
    const picked = pickJoke(mockJokes, '???invalid!@#', undefined, undefined);
    expect(picked).toBeDefined();
    expect(mockJokes.some(j => j.id === picked.id)).toBe(true);
  });

  it('filters pool by tag when tag matches', () => {
    const picked = pickJoke(mockJokes, undefined, undefined, 'security');
    expect(picked.id).toBe('joke-c');
  });

  it('falls back to full pool without dead-ending when tag matches nothing', () => {
    const picked = pickJoke(mockJokes, undefined, undefined, 'unmatched-tag-xyz');
    expect(picked).toBeDefined();
    expect(mockJokes.some(j => j.id === picked.id)).toBe(true);
  });
});
