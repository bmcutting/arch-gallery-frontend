import { useEffect, useRef, useState } from "react";
import { ChevronDown, SearchIcon, SlidersHorizontal } from "lucide-react";
import { FaExclamationTriangle, FaFolderOpen } from "react-icons/fa";
import AppLayout from "../Home/components/AppLayout";
import Input from "../../modules/app/modules/ui/components/Input/Input";
import Segmented from "../../modules/app/modules/ui/components/Segmented/Segmented";
import Button from "../../modules/app/modules/ui/components/Button/Button";
import useSearch from "./hooks/useSearch";
import ProjectFeed from "../../modules/project/components/ProjectFeed";
import ProjectFeedSkeleton from "../../modules/project/components/ProjectFeedSkeleton";

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
  } = useSearch();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSuggestions]);

  const activeFiltersCount = [title, year].filter((v) => v.trim()).length;

  return (
    <AppLayout>
      <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto mt-14">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold mb-2 text-foreground">
            Búsqueda
          </h1>
          <p className="text-muted-foreground">
            Encuentra el proyecto perfecto
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
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
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-20 w-full bg-card border border-border rounded-input mt-1 shadow-warm-lg max-h-60 overflow-auto">
                  {suggestions.map((project) => (
                    <li
                      key={project.id}
                      className="px-4 py-2 hover:bg-muted cursor-pointer transition-smooth"
                      onMouseDown={() => onSelectSuggestion(project)}
                    >
                      <div className="font-medium text-foreground">
                        {project.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {project.year}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
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

          <div
            className={`overflow-hidden transition-smooth ${
              filtersOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-card border border-border rounded-xl shadow-warm p-4 md:p-5 flex flex-col gap-4">
              <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-48">
                  <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                    Título
                  </label>
                  <Input
                    type="text"
                    value={title}
                    onChange={setTitle}
                    placeholder="Filtrar por título"
                    className="w-full px-3 py-2 bg-card border border-border rounded-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="flex-1 min-w-48">
                  <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                    Año
                  </label>
                  <Input
                    type="text"
                    value={year}
                    onChange={setYear}
                    placeholder="Filtrar por año"
                    className="w-full px-3 py-2 bg-card border border-border rounded-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                  Orden
                </label>
                <div className="overflow-x-auto">
                  <Segmented
                    options={SORT_OPTIONS}
                    value={sortValue}
                    onChange={setSortValue}
                  />
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <div className="flex justify-end">
                  <Button size="sm" color="light" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: pageSize }).map((_, i) => (
              <ProjectFeedSkeleton key={i} />
            ))}
          </div>
        )}

        {error && (
          <div className="max-w-xl mx-auto my-10 flex items-start gap-3 p-4 rounded-xl border border-error bg-error/10 text-error">
            <FaExclamationTriangle className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
              <FaFolderOpen />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              Sin resultados
            </h3>
            <p className="text-muted-foreground max-w-sm mb-4">
              No encontramos proyectos con los filtros seleccionados.
            </p>
            <Button size="lg" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {projects.map((item) => (
                <ProjectFeed
                  key={item.project.id}
                  project={item.project}
                  likedByUser={item.likedByUser}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  size="lg"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {page} de {totalPages}
                </span>
                <Button
                  size="lg"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
