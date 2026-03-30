import { SearchIcon } from "lucide-react";
import AppLayout from "../Home/components/AppLayout";
import { useState } from "react";
import Input from "../../modules/app/modules/ui/components/Input/Input";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <AppLayout>
      <div className="mt-14 px-4 md:px-8 py-8 max-w-360 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold mb-2">
            Búsqueda
          </h1>
          <p>Encuentra el proyecto perfecto</p>
        </div>

        <div className="bg-card rounded-xl shadow-primary p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <SearchIcon />
              <Input
                type="text"
                value={query}
                onChange={setQuery}
                onClear={() => setQuery("")}
                placeholder="Buscar proyectos..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2"
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
