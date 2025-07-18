
import { useState } from 'react';
import { Header } from '../components/Header';
import { SearchInput } from '../components/SearchInput';
import { SearchResults } from '../components/SearchResults';
import { CertificateModal } from '../components/CertificateModal';
import { useStudentSearch } from '../hooks/useStudentSearch';

// Configurações da aplicação - facilmente editáveis
const APP_CONFIG = {
  NOME_DO_TREINAMENTO: 'PERCEPÇÃO DE RISCO FOCO COMPORTAMENTAL',
  URL_IMAGEM_LOGO: '/lovable-uploads/505f06ed-1d4e-451d-80b7-b61dc05899dc.png',
  PLACEHOLDER_BUSCA: 'Digite seu nome para buscar o certificado'
};

export interface Student {
  nome: string;
  local: string;
  dataConclusao: string;
  certificadoUrl: string;
  downloadUrl: string;
  url_pdf_completo: string; // Nova propriedade para o link completo do PDF
}

/**
 * Página principal da aplicação de certificados
 * Permite buscar e visualizar certificados digitais
 */
const Index = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const {
    searchTerm,
    searchResults,
    loading,
    error,
    updateSearchTerm
  } = useStudentSearch();

  /**
   * Manipula o clique em um estudante para abrir o modal
   */
  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  /**
   * Fecha o modal do certificado
   */
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header 
          logoUrl={APP_CONFIG.URL_IMAGEM_LOGO}
          title={APP_CONFIG.NOME_DO_TREINAMENTO}
          subtitle="BAIXE SEU CERTIFICADO"
        />
        
        <div className="mt-12">
          <SearchInput 
            value={searchTerm}
            onChange={updateSearchTerm}
            placeholder={APP_CONFIG.PLACEHOLDER_BUSCA}
          />
        </div>

        {(searchTerm.trim() || searchResults.length > 0) && (
          <div className="mt-8">
            <SearchResults 
              results={searchResults}
              loading={loading}
              error={error}
              onStudentClick={handleStudentClick}
              searchTerm={searchTerm}
            />
          </div>
        )}

        {showModal && selectedStudent && (
          <CertificateModal 
            student={selectedStudent}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
