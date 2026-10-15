import React from 'react';
import { ProjectsPage } from './ProjectsPage';

interface AssignmentsPageProps {
  onNavigate: (page: string) => void;
  initialQuery?: string;
}

export const AssignmentsPage: React.FC<AssignmentsPageProps> = (props) => {
  return <ProjectsPage {...props} />;
};

export default AssignmentsPage;
