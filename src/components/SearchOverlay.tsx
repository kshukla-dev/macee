import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (keyword: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-t-4 border-[#e8382e]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h3 className="text-xl font-bold font-heading text-gray-900">
            What are you looking for?
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-black cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="Search by keyword, technology or role (.NET, Java, Spark, Arnhem)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 text-base focus:outline-none focus:border-[#e8382e] focus:ring-1 focus:ring-[#e8382e]"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-4" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-[10px] text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              className="is-btn"
            >
              Search Projects
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
