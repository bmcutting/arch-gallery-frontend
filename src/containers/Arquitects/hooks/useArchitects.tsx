import { useEffect, useState } from "react";
import type { User } from "../../../modules/user/domain/entities/user";
import { getAllUsers } from "../../../modules/user/services/user/get-all-users";

export default function useArchitects() {
  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const [location, setLocation] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [architects, setArchitects] = useState<User[]>([]);

  const SPECIALIZATIONS = [
    { value: "all", label: "Todas las especialidades" },
    { value: "sostenible", label: "Diseño Sostenible" },
    { value: "comercial", label: "Arquitectura Comercial" },
    { value: "minimalista", label: "Arquitectura Minimalista" },
    { value: "urbana", label: "Rehabilitación Urbana" },
    { value: "institucional", label: "Arquitectura Institucional" },
    { value: "industrial", label: "Arquitectura Industrial" },
    { value: "residencial", label: "Arquitectura Residencial" },
  ];

  const LOCATIONS = [
    { value: "all", label: "Todas las ubicaciones" },
    { value: "Madrid", label: "Madrid" },
    { value: "Barcelona", label: "Barcelona" },
    { value: "Valencia", label: "Valencia" },
    { value: "Sevilla", label: "Sevilla" },
    { value: "Bilbao", label: "Bilbao" },
    { value: "Málaga", label: "Málaga" },
    { value: "Zaragoza", label: "Zaragoza" },
  ];

  const SORT_OPTIONS = [
    { value: "name", label: "Nombre A-Z" },
    { value: "experience", label: "Más experiencia" },
    { value: "projects", label: "Más proyectos" },
  ];

  useEffect(() => {
    getAllUsers({})
      .then((result) => {
        // result es un PaginationResult<User>
        setArchitects(result.items); // suponiendo que PaginationResult tiene la propiedad items
      })
      .catch((error) => {
        console.error("Error al obtener usuarios", error);
      });
  }, []);

  return {
    query,
    setQuery,
    specialization,
    setSpecialization,
    location,
    setLocation,
    architects,
    setArchitects,
    sortBy,
    setSortBy,
    LOCATIONS,
    SORT_OPTIONS,
    SPECIALIZATIONS,
  };
}
