"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { LogOut } from "lucide-react";

export function ExitFormBuilderMenuOption() {
  return (
    <MenubarItem onClick={() => (window.location.href = "/")}>
      <LogOut className="h-4 w-4" />
      Exit
    </MenubarItem>
  );
}
