import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import type { Project } from '../types/admin';

export function useProjects(autoFetch = true) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/projects');
      // Handle either direct array or { data: [...] } resource wrapper
      const list = Array.isArray(response.data) ? response.data : response.data?.data || [];
      setProjects(list);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (projectData: Partial<Project>): Promise<Project> => {
    setLoading(true);
    try {
      const response = await api.post('/projects', projectData);
      const created = response.data?.data || response.data;
      setProjects((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to create project';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProject = useCallback(async (id: number, projectData: Partial<Project>): Promise<Project> => {
    setLoading(true);
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      const updated = response.data?.data || response.data;
      setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to update project';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProject = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to delete project';
      setError(msg);
      throw new Error(msg);
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

