"use client";

import { LoadFormDialog } from "@/components/form-builder/dialogs/load-form-dialog";
import { SaveFormDialog } from "@/components/form-builder/dialogs/save-form-dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useHistory } from "@/hooks/use-history";
import { useSaveForm } from "@/hooks/use-save-form";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import {
  Copy,
  FolderOpen,
  LogOut,
  Monitor,
  Play,
  Redo,
  Save,
  Smartphone,
  Tablet,
  Trash2,
  Undo,
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
    updateMode,
    updateViewport,
    duplicateComponent,
    clearForm,
  } = useFormBuilderStore();

  // Get save form hook
  const { saveCurrentForm, isSaving, canSave } = useSaveForm();

  // Get history hook
  const { undo, redo, canUndo, canRedo } = useHistory();

  // Save form handlers

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
          <SaveFormDialog>
            <MenubarItem
              onSelect={(e) => e.preventDefault()}
              disabled={isSaving || !canSave}
            >
              <Save className="h-4 w-4" />
              Save
            </MenubarItem>
          </SaveFormDialog>

          <SaveFormDialog forceSave>
            <MenubarItem
              onSelect={(e) => e.preventDefault()}
              disabled={isSaving || !canSave}
            >
              <Save className="h-4 w-4" />
              Save As
            </MenubarItem>
          </SaveFormDialog>
          <MenubarSeparator />
          <MenubarItem onClick={() => {}}>
            <Play className="h-4 w-4" />
            Publish
          </MenubarItem>
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
          <MenubarItem onClick={undo} disabled={!canUndo}>
            <Undo className="h-4 w-4" />
            Undo
          </MenubarItem>
          <MenubarItem onClick={redo} disabled={!canRedo}>
            <Redo className="h-4 w-4" />
            Redo
          </MenubarItem>
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
          <MenubarItem
            onClick={() => updateMode("editor-preview")}
            disabled={!components.length}
          >
            <Play className="h-4 w-4" />
            Live Preview
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
