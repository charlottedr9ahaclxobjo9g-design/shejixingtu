import { readFileSync } from 'fs';
import { join } from 'path';
import { SkillMap } from '@/lib/types';

const SKILL_DIR = join(process.cwd(), 'public', 'data', 'skills');

const SKILL_FILES: Record<string, string> = {
  'industrial-design': join(SKILL_DIR, 'industrial-design.json'),
  'ui-ux': join(SKILL_DIR, 'ui-ux.json'),
  'visual-brand': join(SKILL_DIR, 'visual-brand.json'),
  'aigc-design': join(SKILL_DIR, 'aigc-design.json'),
};

export function getAllSkills(): SkillMap[] {
  const skills: SkillMap[] = [];
  for (const [, path] of Object.entries(SKILL_FILES)) {
    try {
      const raw = readFileSync(path, 'utf-8');
      skills.push(JSON.parse(raw));
    } catch {
      // skip missing files
    }
  }
  return skills;
}

export function getSkillByDirection(direction: string): SkillMap | null {
  const path = SKILL_FILES[direction];
  if (!path) return null;
  try {
    const raw = readFileSync(path, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
