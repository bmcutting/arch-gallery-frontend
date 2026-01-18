interface Props {
  name: string;
}

export default function CategoryTag({ name }: Props) {
  return (
    <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded-full border border-primary/10">
      {name}
    </span>
  );
}
