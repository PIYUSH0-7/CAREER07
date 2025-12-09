export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
  notes?: string;
}

export interface Section {
  id: string;
  title: string;
  tasks: Task[];
}

export interface DomainResources {
  book: string;
  teacher: string;
  courseLink?: string;
}

export interface Domain {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to map to Lucide icons
  phase: string;
  examDate?: string;
  strategy?: string;
  mindset?: string;
  resources?: DomainResources;
  sections: Section[];
}

export interface AppState {
  domains: Domain[];
  activeDomainId: string;
}

export type View = 'dashboard' | 'domain';