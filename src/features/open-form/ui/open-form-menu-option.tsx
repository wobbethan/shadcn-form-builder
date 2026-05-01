"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { OpenFormDialog } from "@/features/open-form/ui/open-form-dialog";
import { FolderOpen } from "lucide-react";

export function OpenFormMenuOption() {
  return (
    <OpenFormDialog>
      <MenubarItem onSelect={(e) => e.preventDefault()}>
        <FolderOpen className="h-4 w-4" />
        Open
      </MenubarItem>
    </OpenFormDialog>
  );
}
