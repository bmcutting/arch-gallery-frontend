import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectSortFields } from "../domain/enums/project-sort-fileds";
import type { Project } from "../domain/entities/project";
import type { ProjectPaginationParams } from "../dto/write/project-pagination-params";
import type { PaginationResult } from "../../app/modules/shared/domain/core/pagination-result";
import { getAllProjects, type ProjectFeedItem } from "../services/get-all-projects";

export default function useProjectSearch() {
  function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
    func: F,
    wait: number,
  ): (...args: Parameters<F>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<F>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [sortField, setSortField] = useState<ProjectSortFields>(
    ProjectSortFields.TITLE,
  );
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  const [projects, setProjects] = useState<ProjectFeedItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [suggestions, setSuggestions] = useState<Project[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const SORT_OPTIONS = [
    { value: `${ProjectSortFields.TITLE}-ASC`, label: "Título A-Z" },
    { value: `${ProjectSortFields.TITLE}-DESC`, label: "Título Z-A" },
    { value: `${ProjectSortFields.YEAR}-ASC`, label: "Year New-Old" },
    { value: `${ProjectSortFields.YEAR}-DESC`, label: "Year Old-New" },
    { value: "createdAt-DESC", label: "Más recientes" },
  ];

  const buildParams = useCallback((): ProjectPaginationParams => {
    const params: ProjectPaginationParams = {
      page,
      pageSize,
      sort: [{ field: sortField, order: sortOrder }],
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
  }, [page, pageSize, sortField, sortOrder, searchTerm, title, year]);

  const fetchProjects = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current?.abort();

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
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("Error desconocido al cargar los arquitectos");
      }
    } finally {
      setLoading(false);
    }
  }, [buildParams]);

  useEffect(() => {
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
          pageSize: 5,
          search: query.trim(),
        },
      });
      setSuggestions(result.items.map((item) => item.project));
    } catch (err) {
      console.error("Error fetching suggestions", err);
      setSuggestions([]);
    }
  }, []);

  const debouncedFetchSuggestions = useCallback(
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

  const handleSortChange = (value: string) => {
    const [field, order] = value.split("-") as [
      ProjectSortFields,
      "ASC" | "DESC",
    ];
    setSortField(field);
    setSortOrder(order);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setTitle("");
    setYear("");
    setPage(1);
  };

  return {
    searchTerm,
    setSearchTerm: handleSearchChange,
    title,
    setTitle,
    year,
    setYear,
    projects,
    loading,
    error,
    totalItems,
    totalPages,
    page,
    setPage,
    pageSize,
    sortValue: `${sortField}-${sortOrder}`,
    setSortValue: handleSortChange,
    SORT_OPTIONS,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    onSelectSuggestion: handleSelectSuggestion,
    clearFilters,
  };
}
