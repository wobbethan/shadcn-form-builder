"use client";

import { Button } from "@/components/ui/button";
import { useFormBuilderStore } from "@/shared/stores/form-builder-store";
import { Send } from "lucide-react";

export function PublishFormButton() {
  const components = useFormBuilderStore((state) => state.components);

  return (
    <Button
      variant="default"
      size="sm"
      className="cursor-pointer flex-1"
      onClick={() => undefined}
      disabled={components.length === 0}
      id="export-code-button"
    >
      <Send className="h-4 w-4" />
      Publish
    </Button>
  );
}
