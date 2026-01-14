import LinkText from "../../../app/modules/ui/components/LinkText/LinkText";

interface Props {
  message: string;
  linkText: string;
  to: string;
}

export default function AuthPrompt({ message, linkText, to }: Props) {
  return (
    <div className="flex flex-col gap-2 items-center mt-6 text-sm">
      <div className="flex gap-1">
        <span className="text-gray-500">{message}</span>
        <LinkText to={to} highlight>
          {linkText}
        </LinkText>
      </div>
    </div>
  );
}
