import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import type { Project } from '../types/admin';

const STORAGE_KEY = 'jbr_custom_projects';

function getStoredProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredProjects(list: Project[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('projects_updated'));
  } catch (err) {
    console.warn('Failed to save to localStorage:', err);
  }
}

export function useProjects(autoFetch = true) {
  const [projects, setProjects] = useState<Project[]>(() => getStoredProjects());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/projects');
      const list: Project[] = Array.isArray(response.data) ? response.data : response.data?.data || [];
      const stored = getStoredProjects();
      
      // Merge remote and stored by unique ID
      const map = new Map<string | number, Project>();
      list.forEach((p) => map.set(p.id, p));
      stored.forEach((p) => {
        if (!map.has(p.id)) {
          map.set(p.id, p);
        }
      });
      const merged = Array.from(map.values());
      setProjects(merged);
      saveStoredProjects(merged);
    } catch {
      // Offline fallback: load from stored projects
      const stored = getStoredProjects();
      setProjects(stored);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (projectData: Partial<Project>): Promise<Project> => {
    setLoading(true);
    try {
      const response = await api.post('/projects', projectData);
      const created: Project = response.data?.data || response.data;
      setProjects((prev) => {
        const next = [created, ...prev.filter((p) => p.id !== created.id)];
        saveStoredProjects(next);
        return next;
      });
      return created;
    } catch {
      // In case API is offline or fails, create locally
      const localProject: Project = {
        id: Date.now(),
        title: projectData.title || 'Untitled Project',
        description: projectData.description || '',
        image_url: projectData.image_url || '',
        link: projectData.link || '',
        tags: projectData.tags || [],
        price: projectData.price || 0,
        category: projectData.category || 'Web',
        is_active: projectData.is_active ?? true,
        is_featured: projectData.is_featured ?? false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setProjects((prev) => {
        const next = [localProject, ...prev];
        saveStoredProjects(next);
        return next;
      });
      return localProject;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProject = useCallback(async (id: number, projectData: Partial<Project>): Promise<Project> => {
    setLoading(true);
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      const updated: Project = response.data?.data || response.data;
      setProjects((prev) => {
        const next = prev.map((p) => (p.id === id ? updated : p));
        saveStoredProjects(next);
        return next;
      });
      return updated;
    } catch {
      // Offline update fallback
      let fallbackUpdated: Project | null = null;
      setProjects((prev) => {
        const next = prev.map((p) => {
          if (p.id === id) {
            fallbackUpdated = {
              ...p,
              ...projectData,
              updated_at: new Date().toISOString(),
            } as Project;
            return fallbackUpdated;
          }
          return p;
        });
        saveStoredProjects(next);
        return next;
      });
      if (fallbackUpdated) {
        return fallbackUpdated;
      }
      throw new Error('Project not found');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProject = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => {
        const next = prev.filter((p) => p.id !== id);
        saveStoredProjects(next);
        return next;
      });
      return true;
    } catch {
      // Offline delete fallback
      setProjects((prev) => {
        const next = prev.filter((p) => p.id !== id);
        saveStoredProjects(next);
        return next;
      });
      return true;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchProjects();
    }
  }, [autoFetch, fetchProjects]);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}

