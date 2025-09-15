import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects, getProjectById, getDefaultProject } from '../config/projects';
import type { ProjectConfig } from '../config/projects';

interface ProjectContextType {
  currentProject: ProjectConfig;
  setCurrentProject: (project: ProjectConfig) => void;
  switchProject: (projectId: string) => void;
  allProjects: ProjectConfig[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: React.ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<ProjectConfig>(getDefaultProject());

  // Load saved project from localStorage on mount
  useEffect(() => {
    const savedProjectId = localStorage.getItem('selectedProjectId');
    if (savedProjectId) {
      const project = getProjectById(savedProjectId);
      if (project) {
        setCurrentProject(project);
      }
    }
  }, []);

  // Save project selection to localStorage
  useEffect(() => {
    localStorage.setItem('selectedProjectId', currentProject.id);
  }, [currentProject]);

  const switchProject = (projectId: string) => {
    const project = getProjectById(projectId);
    if (project) {
      setCurrentProject(project);
    }
  };

  const value: ProjectContextType = {
    currentProject,
    setCurrentProject,
    switchProject,
    allProjects: projects,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
