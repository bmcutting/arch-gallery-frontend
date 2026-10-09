import { useState } from "react";
import Input from "@modules/app/modules/ui/components/Input/Input";

export type DatePrecision = "year" | "month" | "day";

export interface DateParts {
  day?: number;
  month?: number;
  year?: number;
}

export interface DateInputValue {
  value: DateParts;
  onChange(v: DateParts): void;
}

type Segment = keyof DateParts;

const SEGMENTS: Record<DatePrecision, Segment[]> = {
  year: ["year"],
  month: ["month", "year"],
  day: ["day", "month", "year"],
};

const SEGMENT_CONFIG: Record<
  Segment,
  { length: number; max: number; placeholder: string }
> = {
  day: { length: 2, max: 31, placeholder: "DD" },
  month: { length: 2, max: 12, placeholder: "MM" },
  year: { length: 4, max: 9999, placeholder: "AAAA" },
};

interface Props {
  inputValue: DateInputValue;
  precision?: DatePrecision;
  name?: string;
  full?: boolean;
  disabled?: boolean;
  errorMsg?: string;
  onClear?: () => void;
  className?: string;
}

const splitDigits = (digits: string, segments: Segment[]) => {
  let rest = digits;
  return segments.map((segment) => {
    const chunk = rest.slice(0, SEGMENT_CONFIG[segment].length);
    rest = rest.slice(chunk.length);
    return chunk;
  });
};

const parse = (text: string, segments: Segment[]): DateParts =>
  Object.fromEntries(
    splitDigits(text.replace(/\D/g, ""), segments).map((chunk, i) => [
      segments[i],
      chunk ? Number(chunk) : undefined,
    ]),
  );

const format = (value: DateParts, segments: Segment[]) => {
  const chunks: string[] = [];
  for (const segment of segments) {
    const part = value[segment];
    if (part === undefined) break;
    chunks.push(
      segment === "year"
        ? String(part)
        : String(part).padStart(SEGMENT_CONFIG[segment].length, "0"),
    );
  }
  return chunks.join("/");
};

const sameDate = (a: DateParts, b: DateParts, segments: Segment[]) =>
  segments.every((segment) => a[segment] === b[segment]);

export default function DateInput({
  inputValue,
  precision = "day",
  name,
  full,
  disabled,
  errorMsg,
  onClear,
  className,
}: Props) {
  const segments = SEGMENTS[precision];
  const { value } = inputValue;
  const [text, setText] = useState("");

  const display = sameDate(parse(text, segments), value, segments)
    ? text
    : format(value, segments);

  const handleChange = (raw: string) => {
    const maxDigits = segments.reduce(
      (total, segment) => total + SEGMENT_CONFIG[segment].length,
      0,
    );
    const chunks = splitDigits(raw.replace(/\D/g, "").slice(0, maxDigits), segments);
    const exceeds = chunks.some(
      (chunk, i) => chunk && Number(chunk) > SEGMENT_CONFIG[segments[i]].max,
    );
    if (exceeds) return;

    const next = chunks.filter(Boolean).join("/");
    setText(next);
    inputValue.onChange(parse(next, segments));
  };

  return (
    <Input
      inputValue={{ value: display, onChange: handleChange }}
      placeholder={segments
        .map((segment) => SEGMENT_CONFIG[segment].placeholder)
        .join("/")}
      name={name}
      full={full}
      disabled={disabled}
      errorMsg={errorMsg}
      onClear={onClear}
      className={className}
    />
  );
}
