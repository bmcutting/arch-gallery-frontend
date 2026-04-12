import { SearchIcon } from "lucide-react";
import AppLayout from "../Home/components/AppLayout";
import Input from "../../modules/app/modules/ui/components/Input/Input";
import useSearch from "./hooks/useSearch";

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
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
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
              {showSuggestions && suggestions.length > 0 && (<ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto">
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
                </ul>)}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
