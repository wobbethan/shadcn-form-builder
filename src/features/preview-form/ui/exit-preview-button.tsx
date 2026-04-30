"use client";

import { Button } from "@/components/ui/button";
import { usePreviewMode } from "@/features/preview-form/hooks/use-preview-mode";
import { XIcon } from "lucide-react";

export function ExitPreviewButton() {
  const { exitPreview } = usePreviewMode();

  return (
    <Button
      variant="default"
      size="sm"
      className="cursor-pointer w-full"
      onClick={exitPreview}
    >
      <XIcon className="h-4 w-4" />
      Exit Preview
    </Button>
  );
}
