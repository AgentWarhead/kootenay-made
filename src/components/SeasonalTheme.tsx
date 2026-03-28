'use client';

import { useEffect } from 'react';
import { applySeasonalTheme } from '@/utils/season';

export default function SeasonalTheme() {
  useEffect(() => {
    applySeasonalTheme();
  }, []);
  return null;
}
