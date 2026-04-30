"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { useSaveForm } from "@/features/save-form/hooks/use-save-form";
import { SaveFormDialog } from "@/features/save-form/ui/save-form-dialog";
import { Save } from "lucide-react";

export function SaveAsMenuOption() {
  const { isSaving, canSave } = useSaveForm();

  return (
    <SaveFormDialog forceSave>
      <MenubarItem onSelect={(e) => e.preventDefault()} disabled={isSaving || !canSave}>
        <Save className="h-4 w-4" />
        Save As
      </MenubarItem>
    </SaveFormDialog>
  );
}
