"use client";

import { LoadFormDialog } from "@/components/form-builder/dialogs/load-form-dialog";
import { SaveAsMenuOption } from "@/features/save-form/ui/save-as-menu-option";
import { SaveMenuOption } from "@/features/save-form/ui/save-menu-option";
import { PublishFormMenuOption } from "@/features/publish-form";
import { PreviewMenuOption } from "@/features/preview-form/ui/preview-menu-option";
import { RedoMenuOption } from "@/features/manage-form-version/ui/redo-menu-option";
import { UndoMenuOption } from "@/features/manage-form-version/ui/undo-menu-option";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import {
  Copy,
  FolderOpen,
  LogOut,
  Monitor,
  Smartphone,
  Tablet,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { LoadTemplateDialog } from "../../../../temp-src/components/form-builder/dialogs/load-template-dialog";

interface FormBuilderMenubarProps {
  mode: "editor" | "preview" | "editor-preview";
}

export function FormBuilderMenubar({ mode }: FormBuilderMenubarProps) {
  // Get state from store
  const viewport = useFormBuilderStore((state) => state.viewport);
  const selectedComponent = useFormBuilderStore(
    (state) => state.selectedComponent
  );
  const components = useFormBuilderStore((state) => state.components);
  // Get actions from store
  const {
    updateViewport,
    duplicateComponent,
    clearForm,
  } = useFormBuilderStore();

  // Duplicate component handler
  const handleDuplicate = () => {
    if (selectedComponent) {
      duplicateComponent(selectedComponent.id);
      toast.success("Component duplicated successfully!");
    }
  };

  // Only render if in editor or preview mode
  if (mode !== "editor" && mode !== "preview") {
    return null;
  }

  return (
    <Menubar className="border-none p-0 shadow-none bg-sidebar">
      <MenubarMenu>
        <MenubarTrigger className="gap-2">File</MenubarTrigger>
        <MenubarContent align="start" className="w-48">
          <LoadFormDialog>
            <MenubarItem onSelect={(e) => e.preventDefault()}>
              <FolderOpen className="h-4 w-4" />
              Open
            </MenubarItem>
          </LoadFormDialog>
          <LoadTemplateDialog>
            <MenubarItem onSelect={(e) => e.preventDefault()}>
              <FolderOpen className="h-4 w-4" />
              Open Template
            </MenubarItem>
          </LoadTemplateDialog>
          <MenubarSeparator />
          <SaveMenuOption />
          <SaveAsMenuOption />
          <MenubarSeparator />
          <PublishFormMenuOption />
          <MenubarSeparator />
          <MenubarItem onClick={() => (window.location.href = "/")}>
            <LogOut className="h-4 w-4" />
            Exit
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="gap-2">Edit</MenubarTrigger>
        <MenubarContent align="start" className="w-48">
          <UndoMenuOption />
          <RedoMenuOption />
          <MenubarSeparator />
          <MenubarItem onClick={handleDuplicate} disabled={!selectedComponent}>
            <Copy className="h-4 w-4" />
            Duplicate
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={clearForm} disabled={components.length === 0}>
            <Trash2 className="h-4 w-4" />
            Clear Form
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="gap-2">View</MenubarTrigger>
        <MenubarContent align="start" className="w-48">
          <MenubarItem
            onClick={() => updateViewport("sm")}
            className={viewport === "sm" ? "bg-accent" : ""}
          >
            <Smartphone className="h-4 w-4" />
            Mobile
            {viewport === "sm" && <span className="ml-auto text-xs">✓</span>}
          </MenubarItem>
          <MenubarItem
            onClick={() => updateViewport("md")}
            className={viewport === "md" ? "bg-accent" : ""}
          >
            <Tablet className="h-4 w-4" />
            Tablet
            {viewport === "md" && <span className="ml-auto text-xs">✓</span>}
          </MenubarItem>
          <MenubarItem
            onClick={() => updateViewport("lg")}
            className={viewport === "lg" ? "bg-accent" : ""}
          >
            <Monitor className="h-4 w-4" />
            Desktop
            {viewport === "lg" && <span className="ml-auto text-xs">✓</span>}
          </MenubarItem>
          <MenubarSeparator />
          <PreviewMenuOption />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
