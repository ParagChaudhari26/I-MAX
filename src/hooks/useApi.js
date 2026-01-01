/**
 * Custom hooks for API state management
 * Provides loading states, error handling, and data fetching utilities
 * Requirements: 9.1, 9.4
 */

import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../services/api';

/**
 * Hook for managing async API calls with loading and error states
 * @param {Function} apiFunction - The API function to call
 * @param {boolean} immediate - Whether to call immediately on mount
 * @returns {object} - { data, loading, error, execute, reset }
 */
export function useApi(apiFunction, immediate = false) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return { data, loading, error, execute, reset };
}

/**
 * Hook for fetching data on component mount
 * @param {Function} fetchFunction - The fetch function to call
 * @param {Array} dependencies - Dependencies array for re-fetching
 * @returns {object} - { data, loading, error, refetch }
 */
export function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to load data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for managing CRUD operations with optimistic updates
 * @param {object} api - API object with getAll, create, update, delete methods
 * @param {string} token - Authentication token
 * @returns {object} - CRUD operations and state
 */
export function useCrud(api, token) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.getAll(token);
      setItems(response.data || []);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load items');
    } finally {
      setLoading(false);
    }
  }, [api, token]);

  const createItem = useCallback(async (data) => {
    setOperationLoading(true);
    setError(null);
    
    try {
      const response = await api.create(token, data);
      await fetchItems(); // Refresh list
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to create item';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setOperationLoading(false);
    }
  }, [api, token, fetchItems]);

  const updateItem = useCallback(async (id, data) => {
    setOperationLoading(true);
    setError(null);
    
    try {
      const response = await api.update(token, id, data);
      await fetchItems(); // Refresh list
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to update item';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setOperationLoading(false);
    }
  }, [api, token, fetchItems]);

  const deleteItem = useCallback(async (id) => {
    setOperationLoading(true);
    setError(null);
    
    try {
      await api.delete(token, id);
      await fetchItems(); // Refresh list
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to delete item';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setOperationLoading(false);
    }
  }, [api, token, fetchItems]);

  useEffect(() => {
    if (token) {
      fetchItems();
    }
  }, [token, fetchItems]);

  return {
    items,
    loading,
    error,
    operationLoading,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    setError,
  };
}

export default { useApi, useFetch, useCrud };
