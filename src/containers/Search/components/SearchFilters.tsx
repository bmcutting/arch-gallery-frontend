import Input from "../../../modules/app/modules/ui/components/Input/Input";
import Segmented from "../../../modules/app/modules/ui/components/Segmented/Segmented";
import Button from "../../../modules/app/modules/ui/components/Button/Button";

interface SortOption {
  value: string;
  label: string;
}

interface Props {
  open: boolean;
  title: string;
  setTitle: (v: string) => void;
  year: string;
  setYear: (v: string) => void;
  sortValue: string;
  setSortValue: (v: string) => void;
  sortOptions: SortOption[];
  activeFiltersCount: number;
  onClearFilters: () => void;
}

export default function SearchFilters({
  open,
  title,
  setTitle,
  year,
  setYear,
  sortValue,
  setSortValue,
  sortOptions,
  activeFiltersCount,
  onClearFilters,
}: Props) {
  return (
    <div
      className={`overflow-hidden transition-smooth ${
        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
              options={sortOptions}
              value={sortValue}
              onChange={setSortValue}
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
