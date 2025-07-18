
import { useState, useEffect, useCallback } from 'react';
import { Student, searchStudents } from '../services/certificateService';

/**
 * Hook personalizado para gerenciar a busca de estudantes
 * Inclui debounce automático para melhor performance
 */
export const useStudentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Executa a busca de estudantes
   */
  const performSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchStudents(term);
      setSearchResults(results);
    } catch (err) {
      console.error('Erro na busca:', err);
      setError(err instanceof Error ? err.message : 'Busca falhou');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Efeito de busca com debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, performSearch]);

  /**
   * Atualiza o termo de busca
   */
  const updateSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  /**
   * Limpa a busca e resultados
   */
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchResults([]);
    setError(null);
  }, []);

  return {
    searchTerm,
    searchResults,
    loading,
    error,
    updateSearchTerm,
    clearSearch,
    performSearch
  };
};
