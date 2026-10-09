import { createContext } from "react";

interface FieldContextProps {
  required: boolean;
}

export const FieldContext = createContext<FieldContextProps>({
  required: false,
});
