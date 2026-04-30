"use client";

import { Button } from "@/components/ui/button";
import { useHistory } from "@/features/manage-form-version/hooks/use-history";
import { Redo2 } from "lucide-react";

export function RedoButton() {
  const { redo, canRedo } = useHistory();

  return (
    <Button
      variant="ghost"
      size="default"
      onClick={redo}
      disabled={!canRedo}
      className="flex items-center gap-1"
      title={canRedo ? "Redo last undone action" : "Nothing to redo"}
    >
      <Redo2 className="h-4 w-4" />
    </Button>
  );
}
