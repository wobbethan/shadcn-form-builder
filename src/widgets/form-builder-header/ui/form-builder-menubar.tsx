"use client";

import { OpenFormMenuOption } from "@/features/open-form";
import { OpenTemplateMenuOption } from "@/features/open-template";
import { ExitFormBuilderMenuOption } from "@/features/exit-form-builder";
import { ViewportMenuOptions } from "@/features/change-viewport";
import { SaveMenuOption, SaveAsMenuOption } from "@/features/save-form";
import { PublishFormMenuOption } from "@/features/publish-form";
import { PreviewMenuOption } from "@/features/preview-form";
import { UndoMenuOption, RedoMenuOption } from "@/features/manage-form-version";
import { DuplicateFormMenuOption } from "@/features/duplicate-form";
import { ClearFormMenuOption } from "@/features/clear-form-menu-option";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface FormBuilderMenubarProps {
  mode: "editor" | "preview" | "editor-preview";
}

export function FormBuilderMenubar({ mode }: FormBuilderMenubarProps) {
  // Only render if in editor or preview mode
  if (mode !== "editor" && mode !== "preview") {
    return null;
  }

  return (
    <Menubar className="border-none p-0 shadow-none bg-sidebar">
      <MenubarMenu>
        <MenubarTrigger className="gap-2">File</MenubarTrigger>
        <MenubarContent align="start" className="w-48">
          <OpenFormMenuOption />
          <OpenTemplateMenuOption />
          <MenubarSeparator />
          <SaveMenuOption />
          <SaveAsMenuOption />
          <MenubarSeparator />
          <PublishFormMenuOption />
          <MenubarSeparator />
          <ExitFormBuilderMenuOption />
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="gap-2">Edit</MenubarTrigger>
        <MenubarContent align="start" className="w-48">
          <UndoMenuOption />
          <RedoMenuOption />
          <MenubarSeparator />
          <DuplicateFormMenuOption />
          <MenubarSeparator />
          <ClearFormMenuOption />
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="gap-2">View</MenubarTrigger>
        <MenubarContent align="start" className="w-48">
          <ViewportMenuOptions />
          <MenubarSeparator />
          <PreviewMenuOption />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
