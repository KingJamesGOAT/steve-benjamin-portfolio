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
