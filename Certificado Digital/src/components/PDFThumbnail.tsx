
import React, { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';

interface PDFThumbnailProps {
  pdfUrl: string;
  alt: string;
  className?: string;
}

/**
 * Componente para exibir miniatura de PDF
 * Gera uma prévia usando Google Drive API ou exibe um placeholder
 */
export const PDFThumbnail = ({ pdfUrl, alt, className = '' }: PDFThumbnailProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!pdfUrl) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">PDF não disponível</p>
      </div>
    );
  }

  // Gera URL de miniatura do Google Drive se for um link do Drive
  const getThumbnailUrl = (url: string): string => {
    // Se for Google Drive, extrai o ID e gera URL de miniatura
    if (url.includes('drive.google.com')) {
      const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        const fileId = match[1];
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h300`;
      }
    }
    
    // Para outros URLs, tenta gerar uma prévia usando iframe (fallback)
    return url;
  };

  const thumbnailUrl = getThumbnailUrl(pdfUrl);
  const isGoogleDrive = pdfUrl.includes('drive.google.com');

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className={`w-full bg-white rounded-lg overflow-hidden border-2 border-gray-200 ${className}`}>
      {loading && (
        <div className="w-full h-64 flex items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
          <span className="ml-2 text-gray-500">Carregando prévia...</span>
        </div>
      )}

      {error ? (
        <div className="w-full h-64 bg-gray-100 flex flex-col items-center justify-center">
          <FileText className="h-16 w-16 text-gray-400 mb-2" />
          <p className="text-gray-600 font-medium">Prévia do Certificado</p>
          <p className="text-gray-500 text-sm mt-1">Clique no botão abaixo para visualizar</p>
        </div>
      ) : (
        <>
          {isGoogleDrive ? (
            <img
              src={thumbnailUrl}
              alt={alt}
              className={`w-full h-auto max-h-96 object-contain ${loading ? 'hidden' : 'block'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 flex flex-col items-center justify-center">
              <FileText className="h-16 w-16 text-gray-400 mb-2" />
              <p className="text-gray-600 font-medium">Certificado PDF</p>
              <p className="text-gray-500 text-sm mt-1">Clique no botão abaixo para visualizar</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
