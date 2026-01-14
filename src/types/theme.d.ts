// Leaf Green Theme Type Definitions

export type LeafShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type ForestVariant = 'light' | 'medium' | 'dark';

export interface ThemeColors {
  leaf: Record<LeafShade, string>;
  forest: Record<ForestVariant, string>;
}

export interface ThemeConfig {
  primary: string;
  primaryHover: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
}

export interface ThemeState {
  isDark: boolean;
  colors: ThemeColors;
  config: ThemeConfig;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
export type CardVariant = 'default' | 'elevated' | 'glass' | 'info' | 'success';
export type BadgeVariant = 'default' | 'success' | 'winner' | 'rank' | 'online' | 'waiting';
export type AlertVariant = 'success' | 'info' | 'warning' | 'error';

export interface ComponentProps {
  variant?: string;
  className?: string;
  children?: React.ReactNode;
}
