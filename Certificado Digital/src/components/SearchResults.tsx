
import { User, MapPin, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { Student } from '../pages/Index';

interface SearchResultsProps {
  results: Student[];
  loading: boolean;
  error?: string | null;
  onStudentClick: (student: Student) => void;
  searchTerm: string;
}

/**
 * Componente para exibir resultados da busca de certificados
 * Inclui estados de carregamento, erro e lista de resultados
 */
export const SearchResults = ({ results, loading, error, onStudentClick, searchTerm }: SearchResultsProps) => {
  if (!searchTerm.trim()) return null;

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-gray-600 shadow-2xl animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <User className="text-green-400" aria-hidden="true" />
        Resultado da Pesquisa
      </h2>
      <p className="text-gray-300 mb-6 text-sm md:text-base">
        Para baixar seu certificado, clique no seu nome
      </p>
      
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 text-green-400 animate-spin" aria-hidden="true" />
          <span className="ml-2 text-white">Buscando certificados...</span>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <div className="flex items-center justify-center mb-2">
            <AlertCircle className="h-8 w-8 text-red-400" aria-hidden="true" />
          </div>
          <p className="text-red-400 text-lg mb-2">Erro ao carregar dados</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">Nenhum certificado encontrado</p>
          <p className="text-gray-500 text-sm mt-2">
            Verifique se digitou o nome corretamente. A busca ignora acentos e maiúsculas.
          </p>
        </div>
      ) : (
        <div className="space-y-3" role="list">
          {results.map((student, index) => (
            <div
              key={`${student.nome}-${index}`}
              onClick={() => onStudentClick(student)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onStudentClick(student);
                }
              }}
              className="bg-gray-700/50 hover:bg-gradient-to-r hover:from-green-500/20 hover:to-orange-500/20 p-4 rounded-lg cursor-pointer transition-all duration-300 border border-gray-600 hover:border-green-400/50 group transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              role="listitem"
              tabIndex={0}
              aria-label={`Abrir certificado de ${student.nome}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors">
                  {student.nome}
                </h3>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-orange-400" aria-hidden="true" />
                    <span>{student.local}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-green-400" aria-hidden="true" />
                    <span>{student.dataConclusao}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
