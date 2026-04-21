import { useCallback } from "react";
import { ChevronDown, SearchIcon, SlidersHorizontal } from "lucide-react";
import Input from "../../../modules/app/modules/ui/components/Input/Input";
import useClickOutside from "../../../modules/app/hooks/useClickOutside";
import type { Project } from "../../../modules/project/domain/entities/project";
import SuggestionsDropdown from "./SuggestionsDropdown";

interface Props {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  suggestions: Project[];
  showSuggestions: boolean;
  setShowSuggestions: (v: boolean) => void;
  onSelectSuggestion: (project: Project) => void;
  filtersOpen: boolean;
  onToggleFilters: () => void;
  activeFiltersCount: number;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  onSelectSuggestion,
  filtersOpen,
  onToggleFilters,
  activeFiltersCount,
}: Props) {
  const closeSuggestions = useCallback(
    () => setShowSuggestions(false),
    [setShowSuggestions],
  );
  const searchWrapperRef = useClickOutside<HTMLDivElement>(closeSuggestions);

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div ref={searchWrapperRef} className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none z-10" />
        <Input
          type="text"
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm("")}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Buscar proyectos..."
          full
          className="w-full pl-11 pr-4 py-3.5 text-base md:text-lg bg-card border border-border rounded-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent shadow-warm transition-smooth"
        />
        {showSuggestions && (
          <SuggestionsDropdown
            suggestions={suggestions}
            onSelect={onSelectSuggestion}
          />
        )}
      </div>

      <button
        type="button"
        onClick={onToggleFilters}
        className="flex items-center justify-center gap-2 px-5 py-3 bg-card border border-border rounded-input text-foreground hover:bg-muted transition-smooth shadow-warm whitespace-nowrap"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="font-medium">Filtros</span>
        {activeFiltersCount > 0 && (
          <span className="bg-accent text-card text-xs px-2 py-0.5 rounded-full font-semibold">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 transition-smooth ${filtersOpen ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
