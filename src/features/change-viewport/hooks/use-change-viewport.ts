import { useFormBuilderStore } from "@/shared/stores/form-builder-store";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useMemo } from "react";

export function useChangeViewport() {
  const viewport = useFormBuilderStore((state) => state.viewport);
  const updateViewport = useFormBuilderStore((state) => state.updateViewport);

  const viewportItems = useMemo(
    () => [
      { value: "lg", icon: Monitor },
      { value: "md", icon: Tablet },
      { value: "sm", icon: Smartphone },
    ],
    []
  );

  return {
    viewport,
    viewportItems,
    updateViewport,
  };
}
