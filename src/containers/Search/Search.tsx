import { SearchIcon } from "lucide-react";
import { FaFolderOpen } from "react-icons/fa";
import AppLayout from "../Home/components/AppLayout";
import Input from "../../modules/app/modules/ui/components/Input/Input";
import Select from "../../modules/app/modules/ui/components/Select/Select";
import Button from "../../modules/app/modules/ui/components/Button/Button";
import useSearch from "./hooks/useSearch";
import ProjectFeed from "../../modules/project/components/ProjectFeed";

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
    sortValue,
    setSortValue,
    SORT_OPTIONS,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    onSelectSuggestion,
    clearFilters,
  } = useSearch();

  return (
    <AppLayout>
      <div className="px-4 md:px-8 py-8 max-w-360 mx-auto mt-14">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold mb-2">
            Búsqueda
          </h1>
          <p>Encuentra el proyecto perfecto</p>
        </div>

        <div className="bg-card rounded-xl shadow-primary p-4 md:p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-3 text-primary" />
              <Input
                type="text"
                value={searchTerm}
                onChange={setSearchTerm}
                onClear={() => setSearchTerm("")}
                onBlur={() => setShowSuggestions(true)}
                placeholder="Buscar proyectos..."
                full
                className="w-full pl-10 pr-4 py-2.5 border border-primary rounded-lg text-black placeholder:text-primary"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto">
                  {suggestions.map((project) => (
                    <li
                      key={project.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={() => onSelectSuggestion(project)}
                    >
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-gray-500">
                        {project.year}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Input
                type="text"
                value={title}
                onChange={setTitle}
                placeholder="Filtrar por título"
                className="w-56"
              />

              <Input
                type="text"
                value={year}
                onChange={setYear}
                placeholder="Filtrar por año"
                className="w-56"
              />

              <Select
                label="Ordenar por"
                options={SORT_OPTIONS}
                value={sortValue}
                onChange={setSortValue}
                className="w-44"
              />
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-10">Cargando proyectos...</div>
        )}
        {error && (
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
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
                <span className="text-sm">
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
