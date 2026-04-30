"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { usePreviewMode } from "@/features/preview-form/hooks/use-preview-mode";
import { Play } from "lucide-react";

export function PreviewMenuOption() {
  const { enterPreviewFromMenu, canPreview } = usePreviewMode();

  return (
    <MenubarItem onClick={enterPreviewFromMenu} disabled={!canPreview}>
      <Play className="h-4 w-4" />
      Live Preview
    </MenubarItem>
  );
}
