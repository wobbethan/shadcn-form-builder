"use client";

import { EditorToolbar } from "@/features/add-form-fields";
import { ViewportToggler } from "@/features/change-viewport";
import { PreviewButton, ExitPreviewButton } from "@/features/preview-form";
import { PublishFormButton } from "@/features/publish-form";
import { UndoButton, RedoButton, HistoryButton} from "@/features/manage-form-version";
import { useFormBuilderStore } from "@/shared/stores/form-builder-store";
import { FormBuilderMenubar } from "./form-builder-menubar";
import { cn } from "@/lib/utils";

export function FormBuilderHeader() {
  // Get state from store
  const mode = useFormBuilderStore((state) => state.mode);
  const editor = useFormBuilderStore((state) => state.editor);
  const formTitle = useFormBuilderStore((state) => state.formTitle);
  return (
    <header
      className={cn(
        "fixed top-0 w-full flex flex-row gap-2 justify-between bg-sidebar border-b z-30"
      )}
    >
      <div
        className="flex flex-row gap-2 items-center justify-center md:justify-start p-2 px-4 border-r w-full md:w-[300px]"
      >
        Placeholder
      </div>
      <div className="p-2 flex-1 grid grid-cols-3">
        {(mode === "editor" || mode === "preview") && (
          <>
            <div className={cn("col-span-1")}>
              {!editor && <FormBuilderMenubar mode={mode} />}
            </div>
            <div className="col-span-1 2xl:col-start-2 flex justify-center items-center">
              {editor ? (
                <EditorToolbar editor={editor} isEditable={true} />
              ) : (
                <small>{formTitle}</small>
              )}
            </div>
          </>
        )}
        <div
          className={cn(
            "col-span-1 hidden md:flex justify-end items-center gap-4",
            editor && "",
            mode === "editor-preview" &&
              "justify-center col-span-7 2xl:col-span-3"
          )}
        >
          {!editor && (
            <>
              {mode !== "editor-preview" && (
                <div className="flex items-center gap-1">
                  <UndoButton />
                  <RedoButton />
                  <HistoryButton />
                </div>
              )}
              <ViewportToggler />
            </>
          )}
        </div>
      </div>
      <div className="hidden md:flex flex-row gap-2 border-l py-2 px-4 w-[300px]">
        {(mode === "editor" || mode === "preview") && (
          <>
            <PreviewButton />
            <PublishFormButton />
          </>
        )}
        {mode === "editor-preview" && <ExitPreviewButton />}
      </div>
    </header>
  );
}
