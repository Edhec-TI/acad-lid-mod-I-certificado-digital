
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-6 py-4 text-lg bg-gray-800/90 backdrop-blur-sm border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 shadow-xl placeholder:text-sm md:placeholder:text-lg"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-orange-400/10 rounded-xl -z-10 blur-xl"></div>
    </div>
  );
};
