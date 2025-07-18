
import { X, Download } from 'lucide-react';
import { Student } from '../pages/Index';
import { urlViewer, getDownloadUrl, isGoogleDriveUrl } from '../utils/driveUtils';

interface CertificateModalProps {
  student: Student;
  onClose: () => void;
}

/**
 * Modal para visualização e download de certificados
 * Implementa as especificações do PRD para Google Drive
 * Responsivo e minimal para mobile
 */
export const CertificateModal = ({ student, onClose }: CertificateModalProps) => {
  // Usa url_pdf_completo se disponível, senão usa certificadoUrl
  const certificadoUrl = student.url_pdf_completo || student.certificadoUrl;
  
  const handleDownload = () => {
    // Gera URL de download conforme PRD
    const downloadUrl = getDownloadUrl(certificadoUrl);
    window.open(downloadUrl, '_blank');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Gera URL para visualização conforme PRD, com toolbar=0 para remover botões
  let viewerUrl = urlViewer(certificadoUrl);
  
  // Remove botões do visualizador se for PDF.js ou similar
  if (viewerUrl && !isGoogleDriveUrl(certificadoUrl)) {
    viewerUrl = viewerUrl.includes('?') ? `${viewerUrl}#toolbar=0` : `${viewerUrl}#toolbar=0`;
  }
  
  const isDriveUrl = isGoogleDriveUrl(certificadoUrl);

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="popup-certificado bg-gray-800 rounded-none md:rounded-xl w-full max-w-4xl border-0 md:border md:border-gray-600 shadow-2xl animate-scale-in overflow-hidden">
        {/* Header fixo */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-600 p-3 md:p-4 flex justify-between items-center z-10 shrink-0">
          <h3 className="text-lg md:text-xl font-semibold text-white truncate mr-2">
            Certificado - {student.nome}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white shrink-0"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
        
        {/* Container do certificado - altura dinâmica */}
        <div className="flex flex-col certificate-container">
          {/* Visualizador de PDF conforme PRD */}
          <div className="certificate-viewer">
            {viewerUrl ? (
              <div className="w-full bg-white overflow-hidden">
                <iframe
                  src={viewerUrl}
                  title={`Certificado de ${student.nome}`}
                  className="certificate-iframe w-full border-0 block"
                  frameBorder="0"
                  allowFullScreen
                  loading="lazy"
                  scrolling="no"
                />
              </div>
            ) : (
              <div className="w-full h-40 md:h-64 bg-gray-700 flex items-center justify-center">
                <p className="text-gray-400">PDF não disponível para visualização</p>
              </div>
            )}
          </div>
          
          {/* Footer com informações e botão de download */}
          <div className="p-4 md:p-6 bg-gray-800 border-t border-gray-600 shrink-0">
            <div className="text-center mb-4">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-green-400/20 text-sm md:text-base"
                aria-label={`Baixar certificado de ${student.nome}`}
              >
                <Download className="h-5 w-5 md:h-6 md:w-6" />
                CLIQUE AQUI PARA BAIXAR
              </button>
            </div>
            
            <div className="text-center text-gray-400 text-xs md:text-sm space-y-1">
              <p>Local: {student.local}</p>
              <p>Data de Conclusão: {student.dataConclusao}</p>
              {isDriveUrl && (
                <p className="text-xs mt-2 text-gray-500">
                  Certificado hospedado no Google Drive
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
