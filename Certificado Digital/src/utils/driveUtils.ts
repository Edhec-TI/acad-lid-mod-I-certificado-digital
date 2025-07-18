
/**
 * Utilitários para manipulação de URLs do Google Drive
 */

/**
 * Gera URL de visualização para Google Drive conforme PRD
 * @param url - URL original do Google Drive
 * @returns URL formatada para visualização ou URL original se não for Google Drive
 */
export const urlViewer = (url: string): string => {
  if (url.includes('drive.google.com')) {
    // extrai o ID do arquivo
    const id = url.match(/[-\w]{25,}/);
    if (id) {
      return `https://drive.google.com/file/d/${id[0]}/preview`;
    }
  }
  // se for outro serviço, retorna o próprio link
  return url;
};

/**
 * Gera URL de download direto para Google Drive
 * @param url - URL original do Google Drive
 * @returns URL formatada para download direto
 */
export const getDownloadUrl = (url: string): string => {
  if (url.includes('drive.google.com')) {
    const id = url.match(/[-\w]{25,}/);
    if (id) {
      return `https://drive.google.com/uc?export=download&id=${id[0]}`;
    }
  }
  return url;
};

/**
 * Verifica se uma URL é do Google Drive
 * @param url - URL para verificar
 * @returns true se for do Google Drive
 */
export const isGoogleDriveUrl = (url: string): boolean => {
  return url.includes('drive.google.com');
};
