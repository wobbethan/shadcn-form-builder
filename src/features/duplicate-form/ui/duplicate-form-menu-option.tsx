"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { useFormBuilderStore } from "@/shared/stores/form-builder-store";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function DuplicateFormMenuOption() {
  const selectedComponent = useFormBuilderStore(
    (state) => state.selectedComponent
  );
  const duplicateComponent = useFormBuilderStore(
    (state) => state.duplicateComponent
  );

  const handleDuplicate = () => {
    if (!selectedComponent) return;

    duplicateComponent(selectedComponent.id);
    toast.success("Component duplicated successfully!");
  };

  return (
    <MenubarItem onClick={handleDuplicate} disabled={!selectedComponent}>
      <Copy className="h-4 w-4" />
      Duplicate
    </MenubarItem>
  );
}
