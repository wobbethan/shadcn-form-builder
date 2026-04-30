"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { useHistory } from "@/features/manage-form-version/hooks/use-history";
import { Undo } from "lucide-react";

export function UndoMenuOption() {
  const { undo, canUndo } = useHistory();

  return (
    <MenubarItem onClick={undo} disabled={!canUndo}>
      <Undo className="h-4 w-4" />
      Undo
    </MenubarItem>
  );
}
