
import React from 'react';

interface PDFViewerProps {
  pdfUrl: string;
  alt: string;
  className?: string;
}

/**
 * Componente simples para visualização de PDFs usando iframe
 * Responsivo e otimizado para dispositivos móveis
 */
export const PDFViewer = ({ pdfUrl, alt, className = '' }: PDFViewerProps) => {
  if (!pdfUrl) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">PDF não disponível</p>
      </div>
    );
  }

  return (
    <div className={`w-full bg-white rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={pdfUrl}
        title={alt}
        className="w-full h-full min-h-[500px] md:min-h-[600px] border-0"
        loading="lazy"
      />
    </div>
  );
};
