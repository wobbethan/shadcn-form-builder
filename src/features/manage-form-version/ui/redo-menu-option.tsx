"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { useHistory } from "@/features/manage-form-version/hooks/use-history";
import { Redo } from "lucide-react";

export function RedoMenuOption() {
  const { redo, canRedo } = useHistory();

  return (
    <MenubarItem onClick={redo} disabled={!canRedo}>
      <Redo className="h-4 w-4" />
      Redo
    </MenubarItem>
  );
}
