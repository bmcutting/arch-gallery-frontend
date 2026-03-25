import { FaSearch, FaUserAlt } from "react-icons/fa";
import AppLayout from "../Home/components/AppLayout";
import Input from "../../modules/app/modules/ui/components/Input/Input";
import Select from "../../modules/app/modules/ui/components/Select/Select";
import ArchitectCard from "../../modules/user/components/AuthPrompt/ArquitectCard";
import Button from "../../modules/app/modules/ui/components/Button/Button";
import useArchitects from "./hooks/useArchitects";

export default function Arquitects() {
  const {
    query,
    setQuery,
    specialization,
    setSpecialization,
    location,
    setLocation,
    architects,
    sortBy,
    setSortBy,
    LOCATIONS,
    SORT_OPTIONS,
    SPECIALIZATIONS,
    user,
  } = useArchitects();

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
        {architects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FaUserAlt />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              Sin resultados
            </h3>
            <p className="text-muted-foreground max-w-sm">
              No encontramos arquitectos con los filtros seleccionados.
            </p>
            <Button size="lg">Limpiar filtros</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {architects?.map((architect) => (
              <ArchitectCard key={architect?.id} architect={architect} />
            ))}
          </div>
        )}
        <div></div>
      </div>
    </AppLayout>
  );
}
