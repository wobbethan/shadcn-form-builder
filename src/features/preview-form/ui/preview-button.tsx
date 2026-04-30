"use client";

import { Button } from "@/components/ui/button";
import { usePreviewMode } from "@/features/preview-form/hooks/use-preview-mode";
import { PlayIcon } from "lucide-react";

export function PreviewButton() {
  const { enterPreviewFromHeader, canPreview } = usePreviewMode();

  return (
    <Button
      variant="outline"
      size="sm"
      className="cursor-pointer flex-1"
      onClick={enterPreviewFromHeader}
      disabled={!canPreview}
    >
      <PlayIcon className="h-4 w-4" />
      Preview
    </Button>
  );
}
