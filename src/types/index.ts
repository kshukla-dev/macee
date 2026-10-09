export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  icon: string;
  category?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  pages: string;
  topics: string[];
  downloadName: string;
}

export interface DifferencePillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlight?: string;
}

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

export interface RiskQuestion {
  id: number;
  category: string;
  question: string;
  options: {
    label: string;
    riskScore: number; // 0 = low risk, 25 = high risk
    feedback: string;
  }[];
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}
