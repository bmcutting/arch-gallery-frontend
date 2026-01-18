export default function ProjectCard() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-warm transition-smooth hover:shadow-warm-md group">
      {" "}
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <img
          src="pp.jfif"
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="text-xs md:text-sm font-medium text-foreground caption">
            Urbanismo
          </span>
        </div>
      </div>
      <div className="p-4 md:p-5 space-y-3 md:space-y-4">
        <div>
          <h3 className="text-lg md:text-base font-heading text-foreground mb-1 md:mb-2 line-clamp-1">
            Metagross épico
          </h3>
          <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
            Es un metagross super épico con todas las habilidades que quieras acero/psíquico
          </p>
        </div>
      </div>
    </div>
  );
}
