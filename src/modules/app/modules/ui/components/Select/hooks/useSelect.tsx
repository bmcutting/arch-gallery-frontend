import { useState } from "react";

export interface UseSelectProps {
  placeholder?: string;
  value?: string;
  multiple?: boolean;
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
  multiple,
  placeholder = "Selecciona una opción",
  options,
  disabled,
  onChange,
}: UseSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getSelectedDisplay = () => {
    if (!value) return placeholder;

    if (multiple) {
      const selectedOptions = options?.filter((opt) =>
        value?.includes(opt?.value),
      );
      if (selectedOptions?.length === 0) return placeholder;
      if (selectedOptions?.length === 1) return selectedOptions?.[0]?.label;
      return `${selectedOptions?.length} items selected`;
    }

    const selectedOption = options?.find((opt) => opt?.value === value);
    return selectedOption ? selectedOption?.label : placeholder;
  };

  const handleToggle = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const isSelected = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  const handleOptionSelect = (option: Option) => {
    if (multiple && Array.isArray(value)) {
      const updatedValue = isSelected(option.value)
        ? value.filter((v) => v !== option.value)
        : [...value, option.value];
      console.log(updatedValue);
      onChange("");
    } else {
      onChange(option.value);
      setIsOpen(false);
    }
  };

  return {
    getSelectedDisplay,
    isOpen,
    handleToggle,
    isSelected,
    handleOptionSelect,
  };
}
