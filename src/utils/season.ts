export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface SeasonTheme {
  season: Season;
  accent: string;
  accentLight: string;
  label: string;
}

export function getCurrentSeason(): Season {
  const month = new Date().getMonth(); // 0-indexed
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

export function getSeasonTheme(): SeasonTheme {
  const season = getCurrentSeason();
  switch (season) {
    case 'spring':
      return { season, accent: '#3A8B5E', accentLight: '#4DA672', label: 'Spring' };
    case 'summer':
      return { season, accent: '#D4943A', accentLight: '#E0A54D', label: 'Summer' };
    case 'fall':
      return { season, accent: '#C17817', accentLight: '#D4892A', label: 'Fall' };
    case 'winter':
      return { season, accent: '#4A90A4', accentLight: '#5CA3B7', label: 'Winter' };
  }
}

/**
 * Apply seasonal CSS custom properties to the document body.
 * Call this once on mount (client-side only).
 */
export function applySeasonalTheme(): SeasonTheme {
  const theme = getSeasonTheme();
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--seasonal-accent', theme.accent);
    document.documentElement.style.setProperty('--seasonal-accent-light', theme.accentLight);
  }
  return theme;
}
