export type Page = 
  | 'home' 
  | 'services' 
  | 'blog' 
  | 'testimonials' 
  | 'contact' 
  | 'privacy' 
  | 'blog-detail';

export interface NavigationProps {
  navigate: (page: Page, params?: Record<string, any>) => void;
  currentPage: Page;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content?: string;
}

export interface Service {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  featured: boolean;
}
