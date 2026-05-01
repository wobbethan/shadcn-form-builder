"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { useFormBuilderStore } from "@/shared/stores/form-builder-store";
import { Monitor, Smartphone, Tablet } from "lucide-react";

export function ViewportMenuOptions() {
  const viewport = useFormBuilderStore((state) => state.viewport);
  const updateViewport = useFormBuilderStore((state) => state.updateViewport);

  return (
    <>
      <MenubarItem
        onClick={() => updateViewport("sm")}
        className={viewport === "sm" ? "bg-accent" : ""}
      >
        <Smartphone className="h-4 w-4" />
        Mobile
        {viewport === "sm" && <span className="ml-auto text-xs">✓</span>}
      </MenubarItem>
      <MenubarItem
        onClick={() => updateViewport("md")}
        className={viewport === "md" ? "bg-accent" : ""}
      >
        <Tablet className="h-4 w-4" />
        Tablet
        {viewport === "md" && <span className="ml-auto text-xs">✓</span>}
      </MenubarItem>
      <MenubarItem
        onClick={() => updateViewport("lg")}
        className={viewport === "lg" ? "bg-accent" : ""}
      >
        <Monitor className="h-4 w-4" />
        Desktop
        {viewport === "lg" && <span className="ml-auto text-xs">✓</span>}
      </MenubarItem>
    </>
  );
}
