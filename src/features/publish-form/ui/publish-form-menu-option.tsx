"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { useFormBuilderStore } from "@/shared/stores/form-builder-store";
import { Send } from "lucide-react";

export function PublishFormMenuOption() {
  const components = useFormBuilderStore((state) => state.components);

  return (
    <MenubarItem onClick={() => {}} disabled={components.length === 0}>
      <Send className="h-4 w-4" />
      Publish
    </MenubarItem>
  );
}
