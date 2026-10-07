import Input from "@modules/app/modules/ui/components/Input/Input";
import Button from "@modules/app/modules/ui/components/Button/Button";

interface FilterValue {
  value: string | undefined;
  onChange(v: string): void;
}

interface Props {
  open: boolean;
  title: FilterValue;
  year: FilterValue
  activeFiltersCount: number;
  onClearFilters: () => void;
}

export default function SearchFilters({
  open,
  title,
  year,
  activeFiltersCount,
  onClearFilters,
}: Props) {
  return (
    <div
      className={`overflow-hidden transition-smooth ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
              inputValue={title}
              placeholder="Filtrar por título"
              className="w-full px-3 py-2 bg-card rounded-input text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex-1 min-w-48">
            <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
              Año
            </label>
            <Input
              type="text"
              inputValue={year}
              placeholder="Filtrar por año"
              className="w-full px-3 py-2 bg-card rounded-input text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex justify-end">
            <Button size="sm" color="light" onClick={onClearFilters}>
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
