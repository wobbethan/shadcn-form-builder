"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { useFormBuilderStore } from "@/shared/stores/form-builder-store";
import { Trash2 } from "lucide-react";

export function ClearFormMenuOption() {
  const componentsCount = useFormBuilderStore((state) => state.components.length);
  const clearForm = useFormBuilderStore((state) => state.clearForm);

  return (
    <MenubarItem onClick={clearForm} disabled={componentsCount === 0}>
      <Trash2 className="h-4 w-4" />
      Clear Form
    </MenubarItem>
  );
}
