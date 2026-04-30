"use client";

import { ToggleGroupNav } from "@/components/form-builder/ui/toggle-group-nav";
import { useChangeViewport } from "../hooks/use-change-viewport";

export function ViewportToggler() {
  const { viewport, viewportItems, updateViewport } = useChangeViewport();

  return (
    <ToggleGroupNav
      name="viewport"
      items={viewportItems}
      defaultValue={viewport}
      onValueChange={(value) => updateViewport(value as "sm" | "md" | "lg")}
    />
  );
}
