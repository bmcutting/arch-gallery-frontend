import { useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import useProjectSearch from "../../modules/project/hooks/useProjectSearch";
import SearchHero from "./components/SearchHero";
import SearchBar from "./components/SearchBar";
import SearchFilters from "./components/SearchFilters";
import SearchResults from "./components/SearchResults";

export default function Search() {
  const {
    searchTerm,
    setSearchTerm,
    title,
    setTitle,
    year,
    setYear,
    projects,
    loading,
    error,
    totalPages,
    page,
    setPage,
    pageSize,
    sortValue,
    setSortValue,
    SORT_OPTIONS,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    onSelectSuggestion,
    clearFilters,
  } = useProjectSearch();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFiltersCount = [title, year].filter((v) => v.trim()).length;

  return (
    <AppLayout>
      <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto mt-14">
        <SearchHero />

        <div className="flex flex-col gap-3 mb-6">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            onSelectSuggestion={onSelectSuggestion}
            filtersOpen={filtersOpen}
            onToggleFilters={() => setFiltersOpen((o) => !o)}
            activeFiltersCount={activeFiltersCount}
          />

          <SearchFilters
            open={filtersOpen}
            title={title}
            setTitle={setTitle}
            year={year}
            setYear={setYear}
            sortValue={sortValue}
            setSortValue={setSortValue}
            sortOptions={SORT_OPTIONS}
            activeFiltersCount={activeFiltersCount}
            onClearFilters={clearFilters}
          />
        </div>

        <SearchResults
          loading={loading}
          error={error}
          projects={projects}
          pageSize={pageSize}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          onClearFilters={clearFilters}
        />
      </div>
    </AppLayout>
  );
}
