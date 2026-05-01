"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { FieldsSidebar } from "@/features/add-form-fields/ui/fields-sidebar";
import { cn } from "@/lib/utils";
import { useFormBuilderDnd } from "@/page/form-builder/hooks/use-form-builder-dnd";
import { useTemplateWelcome } from "@/page/form-builder/hooks/use-template-welcome";
import { MobileNotification } from "@/page/form-builder/ui/mobile-notification";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { useFormBuilderStore } from "@/shared/stores/form-builder-store";
import { MainCanvas } from "@/widgets/canvas/ui/main-canvas";
import { FormBuilderHeader } from "@/widgets/form-builder-header/ui/form-builder-header";
import {
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import { Loader2 } from "lucide-react";

export function FormBuilderPage() {
  const isMobile = useIsMobile();
  const mode = useFormBuilderStore((state) => state.mode);
  const {
    isLoadingTemplate,
    showWelcomeDialog,
    setShowWelcomeDialog,
    handleStartFromScratch,
  } = useTemplateWelcome();
  const {
    sensors,
    collisionDetection,
    handleDragEnd,
    handleDragStart,
    draggingDOMElement,
  } = useFormBuilderDnd();

  // Show loading state while template is being loaded
  if (isLoadingTemplate) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
      <div>
        <FormBuilderHeader />
        {isMobile ? (
        <>
          <MobileNotification />
        </>
      ) : (
        <SidebarProvider
          className="relative hidden md:block"
          style={{ "--sidebar-width": "300px" } as React.CSSProperties}
          open={mode === "editor" || mode === "preview"}
        >
          <DndContext
            id="form-builder"
            sensors={sensors}
            collisionDetection={collisionDetection}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <div className="flex w-full h-screen justify-between">
              <FieldsSidebar />
              <main
                className={cn(
                  "flex-1 transition-all duration-300 overflow-auto relative bg-dotted pt-14 scrollbar-hide"
                )}
              >
                {/* <MainCanvas /> */}
              </main>
              {/* <SidebarRight /> */}
            </div>
            <DragOverlay>
              {draggingDOMElement && (
                <div className="bg-white p-2 rounded-md shadow opacity-80">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: draggingDOMElement.innerHTML,
                    }}
                    className="max-h-52 overflow-hidden"
                  />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </SidebarProvider>
      )}

        {/* Welcome Dialog */}
        {/* <WelcomeDialog
          open={showWelcomeDialog}
          onOpenChange={setShowWelcomeDialog}
          onStartFromScratch={handleStartFromScratch}
        /> */}
      </div>
  );
}
