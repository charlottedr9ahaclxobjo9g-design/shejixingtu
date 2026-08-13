import { readFileSync } from 'fs';
import { join } from 'path';
import { Resource, ResourcesDataWrapper } from '@/lib/types';

const DATA_PATH = join(process.cwd(), 'public', 'data', 'resources.json');

function readResourcesData(): Resource[] {
  try {
    const raw = readFileSync(DATA_PATH, 'utf-8');
    const data: ResourcesDataWrapper = JSON.parse(raw);
    return data.resources || [];
  } catch {
    return [];
  }
}

export function getResources(): Resource[] {
  return readResourcesData();
}

export function getActiveResources(): Resource[] {
  return readResourcesData().filter((r) => r.active);
}
