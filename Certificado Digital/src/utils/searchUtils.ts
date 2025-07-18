
/**
 * Utilitários para busca e manipulação de strings
 */

/**
 * Normaliza string removendo acentos e caracteres especiais (conforme PRD)
 * @param str - String original
 * @returns String normalizada sem acentos
 */
export const normalizar = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

/**
 * Remove acentos e caracteres especiais de uma string
 * @param str - String original
 * @returns String sem acentos
 */
export const removeAccents = (str: string): string => {
  return normalizar(str);
};

/**
 * Normaliza uma string para busca (remove acentos, espaços extras e converte para minúsculo)
 * @param str - String original
 * @returns String normalizada para busca
 */
export const normalizeForSearch = (str: string): string => {
  return normalizar(str.trim());
};

/**
 * Verifica se um termo de busca corresponde a um texto, ignorando acentos
 * @param searchTerm - Termo de busca
 * @param targetText - Texto alvo
 * @returns true se houver correspondência
 */
export const matchesSearch = (searchTerm: string, targetText: string): boolean => {
  const normalizedSearch = normalizar(searchTerm);
  const normalizedTarget = normalizar(targetText);
  
  return normalizedTarget.includes(normalizedSearch);
};

/**
 * Busca por múltiplas palavras em um texto
 * @param searchTerm - Termo de busca (pode conter múltiplas palavras)
 * @param targetText - Texto alvo
 * @returns true se todas as palavras forem encontradas
 */
export const matchesMultiWordSearch = (searchTerm: string, targetText: string): boolean => {
  const searchWords = normalizar(searchTerm).split(' ').filter(word => word.length > 0);
  const normalizedTarget = normalizar(targetText);
  
  return searchWords.every(word => normalizedTarget.includes(word));
};
