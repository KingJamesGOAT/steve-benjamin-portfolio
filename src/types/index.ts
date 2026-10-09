export type Language = 'en' | 'fr';

export interface NavItem {
  key: string;
  labelKey: string;
  path: string;
}

export interface ProjectSnippet {
  id: string;
  title: string;
  context: string;
  filename: string;
  code: string;
  language: string;
}

export interface ThesisProposal {
  id: number;
  title: string;
  description: string;
}

export interface CommandPaletteItem {
  id: string;
  titleKey: string;
  subtitleKey?: string;
  path: string;
  category: 'navigation' | 'action';
}

export interface GlossaryTermProps {
  term: string;
  definition: string;
  className?: string;
}

export interface MockIDEProps {
  filename: string;
  code: string;
  className?: string;
}
