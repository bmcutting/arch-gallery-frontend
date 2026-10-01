import LinkText from "@modules/app/modules/ui/components/LinkText/LinkText";

interface Props {
  message: string;
  linkText: string;
  to: string;
}

export default function AuthPrompt({ message, linkText, to }: Props) {
  return (
    <div className="flex flex-col gap-2 items-center mt-4 text-sm">
      <div className="flex gap-1">
        <span className="text-muted-foreground">{message}</span>
        <LinkText to={to} highlight>
          {linkText}
        </LinkText>
      </div>
    </div>
  );
}
