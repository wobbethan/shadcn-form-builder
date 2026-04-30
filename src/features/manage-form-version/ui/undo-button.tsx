"use client";

import { Button } from "@/components/ui/button";
import { useHistory } from "@/features/manage-form-version/hooks/use-history";
import { Undo2 } from "lucide-react";

export function UndoButton() {
  const { undo, canUndo } = useHistory();

  return (
    <Button
      variant="ghost"
      size="default"
      onClick={undo}
      disabled={!canUndo}
      className="flex items-center gap-1"
      title={canUndo ? "Undo last action" : "Nothing to undo"}
    >
      <Undo2 className="h-4 w-4" />
    </Button>
  );
}
