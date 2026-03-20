import { useState, useEffect } from "react";

export default function useContextMenu() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest(".context-menu")) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleMenu(id: string) {
    setOpenMenuId(openMenuId === id ? null : id);
  }

  return { openMenuId, toggleMenu, setOpenMenuId };
}
