'use client';
import { useState, useMemo } from 'react';

export function useFilter<T extends object>(
  items: T[],
  filterKeys: (keyof T)[]
) {
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});

  const setFilter = (key: keyof T, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters({});

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      filterKeys.every((key) => {
        const v = filters[key];
        if (!v || v === 'all') return true;
        return String(item[key]) === v || String(item[key]).includes(v);
      })
    );
  }, [items, filters, filterKeys]);

  return { filters, setFilter, clearFilters, filteredItems };
}
