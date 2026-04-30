"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { useFormBuilderStore } from "@/stores/form-builder-store";
import { ChevronDown, ChevronUp, Settings2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getCoponentSidebarOptions } from "@/config/available-components";
import { ReactNode, useEffect, useState } from "react";

interface PropertySectionProps {
  title: string;
  children: ReactNode;
  index: number;
}

interface EmptySidebarStateProps {
  title: string;
  description: string;
}

function EmptySidebarState({ title, description }: EmptySidebarStateProps) {
  return (
    <div className="h-full min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-xs rounded-lg bg-card text-card-foreground p-6 text-center ">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
          <Settings2 className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function PropertySection({ title, children, index }: PropertySectionProps) {
  const [isOpenState, setIsOpenState] = useState(false);

  useEffect(() => {
    setIsOpenState(index < 3);
  }, [index]);

  return (
    <Collapsible className="border-b" open={isOpenState}>
      <CollapsibleTrigger
        className="flex items-center justify-between w-full p-4 cursor-pointer"
        onClick={() => setIsOpenState(!isOpenState)}
      >
        <span className="font-normal text-sm">{title}</span>
        {isOpenState ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 pt-0 space-y-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

const PROPERTY_SECTIONS = [
  { key: "options", title: "Data Options" },
  { key: "input", title: "Input" },
  { key: "label", title: "Label & Description" },
  { key: "button", title: "Button" },
  { key: "grid", title: "Appearance" },
  { key: "validation", title: "Validation" },
] as const;

export function SidebarRight() {
  const { selectedComponent } = useFormBuilderStore();
  const mode = useFormBuilderStore((state) => state.mode);


  let sidebarContent;

  if (!selectedComponent) {
    sidebarContent = (
      <EmptySidebarState
        title="No Component Selected"
        description="Select a component on the canvas to configure its properties."
      />
    );
  } else {
    const componentSidebarOptions = getCoponentSidebarOptions(selectedComponent);

    if (!componentSidebarOptions) {
      sidebarContent = (
        <EmptySidebarState
          title="No Properties"
          description="This component does not expose configurable properties."
        />
      );
    } else {
      const filteredPropertySections = PROPERTY_SECTIONS.filter((section) => {
        return componentSidebarOptions[section.key] !== null;
      });

      sidebarContent = (
        <div>
          {filteredPropertySections.map(({ key, title }, index) => {
            const content = componentSidebarOptions[key];
            return (
              <PropertySection 
                key={key} 
                title={title} 
                index={index}
              >
                {content}
              </PropertySection>
            );
          })}
        </div>
      );
    }
  }

  return (
    <Sidebar side="right" className="border-l top-13 pb-16">
      <SidebarContent>{sidebarContent}</SidebarContent>
    </Sidebar>
  );
}
