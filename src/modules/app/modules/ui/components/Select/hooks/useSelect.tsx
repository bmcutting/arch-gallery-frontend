import { useState } from "react";

export interface UseSelectProps {
  placeholder?: string;
  value?: string;
  options?: Option[];
  disabled?: boolean;
  onChange: (value: string) => void;
}

interface Option {
  value: string;
  label: string;
}

export default function useSelect({
  value,
  placeholder = "Selecciona una opción",
  options,
  disabled,
  onChange,
}: UseSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getSelectedDisplay = () => {
    if (!value) return placeholder;

    const selectedOption = options?.find((opt) => opt?.value === value);
    return selectedOption ? selectedOption?.label : placeholder;
  };

  const handleToggle = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const isSelected = (optionValue: string) => value === optionValue;

  const handleOptionSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return {
    getSelectedDisplay,
    isOpen,
    handleToggle,
    isSelected,
    handleOptionSelect,
  };
}
