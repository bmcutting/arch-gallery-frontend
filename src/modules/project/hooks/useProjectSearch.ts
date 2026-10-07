import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "@modules/app/domain/helpers/debounce";
import type { Project } from "@modules/project/domain/entities/project";
import type { ProjectPaginationParams } from "@modules/project/dto/write/project-pagination-params";
import type { PaginationResult } from "@modules/app/modules/shared/domain/core/pagination-result";
import { getAllProjects, type ProjectFeedItem } from "@modules/project/services/get-all-projects";

export default function useProjectSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);

  const [projects, setProjects] = useState<ProjectFeedItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [suggestions, setSuggestions] = useState<Project[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const buildParams = useCallback((): ProjectPaginationParams => {
    const params: ProjectPaginationParams = {
      page,
      limit: pageSize,
    };

    if (searchTerm.trim()) {
      params.search = searchTerm.trim();
    }

    if (title.trim()) {
      params.title = title.trim();
    }

    if (year.trim()) {
      const parsedYear = Number(year.trim());
      if (!Number.isNaN(parsedYear)) {
        params.year = parsedYear;
      }
    }

    return params;
  }, [page, pageSize, searchTerm, title, year]);

  const fetchProjects = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const params = buildParams();
      const result: PaginationResult<ProjectFeedItem> = await getAllProjects({
        params,
        controller,
      });

      setProjects(result.items);
      setTotalItems(result.totalItems);
      setTotalPages(result.totalPages);
    } catch (err: unknown) {
      // Una peticion cancelada ya fue reemplazada por otra: no es un error.
      if (controller.signal.aborted) return;
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("Error desconocido al cargar los arquitectos");
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [buildParams]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();
  }, [fetchProjects]);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const result = await getAllProjects({
        params: {
          page: 1,
          limit: 5,
          search: query.trim(),
        },
      });
      setSuggestions(result.items.map((item) => item.project));
    } catch (err) {
      console.error("Error fetching suggestions", err);
      setSuggestions([]);
    }
  }, []);

  const debouncedFetchSuggestions = useMemo(
    () =>
      debounce((query: string) => {
        fetchSuggestions(query).catch(console.error);
      }, 300),
    [fetchSuggestions],
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedFetchSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (project: Project) => {
    setSearchTerm(project.title);
    setShowSuggestions(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setTitle("");
    setYear("");
    setPage(1);
  };

  return {
    searchTerm: { value: searchTerm, onChange: handleSearchChange },
    title: { value: title, onChange: setTitle },
    year: { value: year, onChange: setYear },
    projects,
    loading,
    error,
    totalItems,
    totalPages,
    page,
    setPage,
    pageSize,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    onSelectSuggestion: handleSelectSuggestion,
    clearFilters,
  };
}
