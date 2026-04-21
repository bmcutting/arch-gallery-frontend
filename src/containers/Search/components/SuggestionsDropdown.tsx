import type { Project } from "../../../modules/project/domain/entities/project";

interface Props {
  suggestions: Project[];
  onSelect: (project: Project) => void;
}

export default function SuggestionsDropdown({ suggestions, onSelect }: Props) {
  if (suggestions.length === 0) return null;

  return (
    <ul className="absolute z-20 w-full bg-card border border-border rounded-input mt-1 shadow-warm-lg max-h-60 overflow-auto">
      {suggestions.map((project) => (
        <li
          key={project.id}
          className="px-4 py-2 hover:bg-muted cursor-pointer transition-smooth"
          onMouseDown={() => onSelect(project)}
        >
          <div className="font-medium text-foreground">{project.title}</div>
          <div className="text-sm text-muted-foreground">{project.year}</div>
        </li>
      ))}
    </ul>
  );
}
