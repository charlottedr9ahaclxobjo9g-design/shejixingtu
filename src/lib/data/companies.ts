import { readFileSync } from 'fs';
import { join } from 'path';
import { Company, CompaniesDataWrapper } from '@/lib/types';

const DATA_PATH = join(process.cwd(), 'data', 'companies.json');

function readCompaniesData(): Company[] {
  try {
    const raw = readFileSync(DATA_PATH, 'utf-8');
    const data: CompaniesDataWrapper = JSON.parse(raw);
    return data.companies || [];
  } catch {
    return [];
  }
}

export function getCompanies(): Company[] {
  return readCompaniesData();
}

export function getCompanyBySlug(slug: string): Company | null {
  const companies = readCompaniesData();
  return companies.find((c) => c.slug === slug) || null;
}

export function getFeaturedCompanies(limit?: number): Company[] {
  const companies = readCompaniesData();
  const featured = companies.filter((c) => c.featured);
  return limit ? featured.slice(0, limit) : featured;
}
