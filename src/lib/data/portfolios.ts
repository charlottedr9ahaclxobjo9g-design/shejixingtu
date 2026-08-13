import { readFileSync } from 'fs';
import { join } from 'path';
import { PortfolioArticle } from '@/lib/types';

const DATA_PATH = join(process.cwd(), 'public', 'data', 'portfolios.json');

function readPortfoliosData(): PortfolioArticle[] {
  try {
    const raw = readFileSync(DATA_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return data.portfolios || [];
  } catch {
    return [];
  }
}

export function getPortfolios(): PortfolioArticle[] {
  return readPortfoliosData();
}

export function getFeaturedPortfolios(limit?: number): PortfolioArticle[] {
  const portfolios = readPortfoliosData();
  const featured = portfolios.filter((p) => p.featured);
  return limit ? featured.slice(0, limit) : featured;
}
