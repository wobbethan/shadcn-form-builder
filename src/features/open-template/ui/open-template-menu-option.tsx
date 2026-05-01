"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { FolderOpen } from "lucide-react";
import { LoadTemplateDialog } from "./load-template-dialog";

export function OpenTemplateMenuOption() {
  return (
    <LoadTemplateDialog>
      <MenubarItem onSelect={(e) => e.preventDefault()}>
        <FolderOpen className="h-4 w-4" />
        Open Template
      </MenubarItem>
    </LoadTemplateDialog>
  );
}
