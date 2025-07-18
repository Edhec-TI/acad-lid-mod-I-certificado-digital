
/**
 * Utilitários para formatação de datas
 */

/**
 * Formata uma data no padrão brasileiro (DD/MM/AAAA)
 * @param dateString - String da data no formato ISO ou similar
 * @returns Data formatada no padrão brasileiro
 */
export const formatToBrazilianDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
      // Se não conseguir converter, tenta assumir que já está no formato DD/MM/AAAA
      if (dateString.includes('/')) {
        return dateString;
      }
      return dateString;
    }
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.warn('Erro ao formatar data:', error);
    return dateString; // Retorna a string original em caso de erro
  }
};

/**
 * Converte uma data brasileira (DD/MM/AAAA) para ISO (AAAA-MM-DD)
 * @param brazilianDate - Data no formato DD/MM/AAAA
 * @returns Data no formato ISO
 */
export const brazilianDateToISO = (brazilianDate: string): string => {
  if (!brazilianDate || !brazilianDate.includes('/')) {
    return brazilianDate;
  }
  
  const [day, month, year] = brazilianDate.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};
