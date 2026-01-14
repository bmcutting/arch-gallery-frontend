import Label from "../../../Label/Label";
import Switch from "../../../Switch/Switch";

interface Props {
  text: string;
  secondaryText?: string;
  checked: boolean;
  onChange(v: boolean): void;
  uppercase?: boolean;
}

export default function SwitchText({
  checked,
  onChange,
  text,
  uppercase,
  secondaryText,
}: Props) {
  return (
    <div className="flex mb-1 items-center gap-x-2.5">
      {secondaryText && (
        <Label size="sm" uppercase={uppercase}>
          {secondaryText}
        </Label>
      )}

      <Switch checked={checked} onChange={onChange} />

      <Label size="sm" uppercase={uppercase}>
        {text}
      </Label>
    </div>
  );
}
