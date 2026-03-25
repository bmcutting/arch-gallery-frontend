import { FaSearch } from "react-icons/fa";
import AppLayout from "../Home/components/AppLayout";
import Input from "../../modules/app/modules/ui/components/Input/Input";
import { useState } from "react";
import Select from "../../modules/app/modules/ui/components/Select/Select";
import ArchitectCard from "../../modules/user/components/AuthPrompt/ArquitectCard";
import useProfile from "../Profile/hooks/useProfile";

export default function Arquitects() {
  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const [location, setLocation] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const user = useProfile();

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

  return (
    <AppLayout>
      <div className="px-4 md:px-8 py-8 max-w-360 mx-auto mt-14">
        <h1>Directorio de Arquitectos</h1>
        <p className="text-muted-foreground">
          Conecta con los mejores profesionales de la arquitectura
        </p>

        <div className="bg-card rounded-xl shadow-primary p-4 md:p-5 mb-6">
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-3 text-primary" />
              <Input
                type="text"
                value={query}
                onChange={setQuery}
                placeholder="Buscar por nombre, especialidad..."
                full
                className="w-full pl-10 pr-4 py-2.5 border border-primary rounded-lg text-black placeholder:text-primary"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Select
                label="Especialidad"
                options={SPECIALIZATIONS}
                value={specialization}
                onChange={setSpecialization}
                className="w-56"
              />

              <Select
                label="Ubicación"
                options={LOCATIONS}
                value={location}
                onChange={setLocation}
                className="w-44"
              />

              <Select
                label="Ordenar por"
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={setSortBy}
                className="w-44"
              />
            </div>
            <ArchitectCard architect={user}></ArchitectCard>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
