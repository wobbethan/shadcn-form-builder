"use client";

import { useFormBuilderStore } from "@/stores/form-builder-store";

/**
 * Shared preview mode actions and state for header/menubar controls.
 */
export const usePreviewMode = () => {
  const components = useFormBuilderStore((state) => state.components);
  const updateMode = useFormBuilderStore((state) => state.updateMode);
  const selectComponent = useFormBuilderStore((state) => state.selectComponent);

  const canPreview = components.length > 0;

  const enterPreviewFromMenu = () => {
    updateMode("editor-preview");
  };

  const enterPreviewFromHeader = () => {
    updateMode("editor-preview");
    selectComponent(null);
  };

  const exitPreview = () => {
    updateMode("editor");
  };

  return {
    canPreview,
    enterPreviewFromMenu,
    enterPreviewFromHeader,
    exitPreview,
  };
};
