import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';

const ProjectSelector: React.FC = () => {
  const { currentProject, switchProject, allProjects } = useProject();
  const [isOpen, setIsOpen] = useState(false);

  const handleProjectSelect = (projectId: string) => {
    switchProject(projectId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Current Project Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--bg-hover)] transition-colors"
      >
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: currentProject.color }}
        >
          {currentProject.logo}
        </div>
        <div className="text-left">
          <div className="text-white text-sm font-medium">{currentProject.displayName}</div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {currentProject.network.name}
          </div>
        </div>
        <svg 
          className={`w-4 h-4 text-[var(--text-secondary)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-xl z-50">
          <div className="p-4">
            <div className="text-sm font-medium text-white mb-3">Select Project</div>
            <div className="space-y-2">
              {allProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectSelect(project.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    currentProject.id === project.id 
                      ? 'bg-[var(--bg-hover)]' 
                      : 'hover:bg-[var(--bg-hover)]'
                  }`}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.logo}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-white text-sm font-medium">{project.displayName}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {project.description}
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {project.network.name}
                    </div>
                  </div>
                  {currentProject.id === project.id && (
                    <svg className="w-4 h-4 text-[#00d4aa]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectSelector;
