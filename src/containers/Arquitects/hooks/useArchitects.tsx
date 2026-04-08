import { useCallback, useEffect, useRef, useState } from "react";
import { UserSortFields } from "../../../modules/user/domain/enums/user-sort-fields";
import type { User } from "../../../modules/user/domain/entities/user";
import type { UserPaginationParams } from "../../../modules/user/dto/write/user-pagination-params";
import type { PaginationResult } from "../../../modules/app/modules/shared/domain/core/pagination-result";
import { getAllUsers } from "../../../modules/user/services/user/get-all-users";

export default function useArchitects() {
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [sortField, setSortField] = useState<UserSortFields>(
    UserSortFields.FIRST_NAME,
  );
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  const [architects, setArchitects] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const SORT_OPTIONS = [
    { value: `${UserSortFields.FIRST_NAME}-ASC`, label: "Nombre A-Z" },
    { value: `${UserSortFields.FIRST_NAME}-DESC`, label: "Nombre Z-A" },
    { value: `${UserSortFields.LAST_NAME}-ASC`, label: "Apellido A-Z" },
    { value: `${UserSortFields.LAST_NAME}-DESC`, label: "Apellido Z-A" },
    { value: `${UserSortFields.EMAIL}-ASC`, label: "Email A-Z" },
    { value: "createdAt-DESC", label: "Más recientes" },
  ];

  const buildParams = useCallback((): UserPaginationParams => {
    const params: UserPaginationParams = {
      page,
      pageSize,
      sort: [{ field: sortField, order: sortOrder }],
    };

    if (searchTerm.trim()) {
      params.search = searchTerm.trim();
    }

    if (firstName.trim()) {
      params.firstName = firstName.trim();
    }
    if (lastName.trim()) {
      params.lastName = lastName.trim();
    }

    return params;
  }, [page, pageSize, sortField, sortOrder, searchTerm, firstName, lastName]);

  const fetchArchitects = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current?.abort();

    setLoading(true);
    setError(null);

    try {
      const params = buildParams();
      const result: PaginationResult<User> = await getAllUsers({
        params,
        controller,
      });

      setArchitects(result.items);
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
    fetchArchitects();
  }, [fetchArchitects]);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      // Usamos el mismo endpoint pero con pageSize pequeño y solo el campo search
      const result = await getAllUsers({
        params: {
          page: 1,
          pageSize: 5,
          search: query.trim(),
        },
      });
      setSuggestions(result.items);
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

  const handleSelectSuggestion = (user: User) => {
    setSearchTerm(user.userName); // o lo que quieras mostrar
    setShowSuggestions(false);
    // Opcional: podrías navegar al perfil o aplicarlo como filtro exacto
  };

  const handleSortChange = (value: string) => {
    const [field, order] = value.split("-") as [UserSortFields, "ASC" | "DESC"];
    setSortField(field);
    setSortOrder(order);
    setPage(1);
  };

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSearchTerm("");
    setFirstName("");
    setLastName("");
    setPage(1);
  };

  return {
    searchTerm,
    setSearchTerm: handleSearchChange,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    architects,
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
    // Sugerencias
    suggestions,
    showSuggestions,
    setShowSuggestions,
    onSelectSuggestion: handleSelectSuggestion,
    // Utilidades
    clearFilters,
  };
}
