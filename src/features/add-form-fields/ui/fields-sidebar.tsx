"use client";

import { AVAILABLE_COMPONENTS } from "@/config/available-components";
import { useFormBuilderStore } from "@/stores/form-builder-store";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDraggable } from "@dnd-kit/core";
import { ComponentIcon } from "./form-components/component-icon";

interface ComponentGroup {
  label: string;
  components: typeof AVAILABLE_COMPONENTS;
}


export function FieldsSidebar() {
  const { addComponent } = useFormBuilderStore();
  const componentGroups: ComponentGroup[] = [
    {
      label: "Typography",
      components: AVAILABLE_COMPONENTS.filter(
        (comp) => comp.category === "content"
      ),
    },
    {
      label: "Input Fields",
      components: AVAILABLE_COMPONENTS.filter((comp) =>
        ["input", "textarea", "number", "email", "tel", "file"].includes(
          comp.type
        )
      ),
    },
    {
      label: "Selection Fields",
      components: AVAILABLE_COMPONENTS.filter((comp) =>
        ["select", "checkbox", "checkbox-group", "radio", "switch"].includes(
          comp.type
        )
      ),
    },
    {
      label: "Date & Time",
      components: AVAILABLE_COMPONENTS.filter((comp) =>
        ["date"].includes(comp.type)
      ),
    },
    {
      label: "Buttons",
      components: AVAILABLE_COMPONENTS.filter((comp) =>
        ["submit-button", "reset-button"].includes(comp.type)
      ),
    },
  ];

  const ComponentItem = ({
    component,
    index,
  }: {
    component: (typeof AVAILABLE_COMPONENTS)[0];
    index: number;
  }) => {
    const {
      attributes: columnAttributes,
      listeners: columnListeners,
      setNodeRef,
    } = useDraggable({
      id: component.id,
      data: {
        component,
        action: "add",
      },
    });

    return (
      <SidebarMenuItem key={component.id} ref={setNodeRef}>
        <SidebarMenuButton
          onClick={() => addComponent(component)}
          className="h-12 cursor-pointer"
          data-item-id={component.id}
        >
          <div
            {...columnAttributes}
            {...columnListeners}
            className="flex items-center gap-2 w-full"
          >
            <div className="bg-muted p-2 rounded-md border ">
              <ComponentIcon icon={component.icon} className="w-5 h-5" />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium">
                {component.label}
              </span>
              <span className="text-xs text-gray-500">
                {component.label_info}
              </span>

            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className=" top-13 bottom-14 z-20">
      <div className="flex flex-col h-[calc(100%-56px)]">
        <SidebarContent className="gap-0 pb-5">
          {componentGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarMenu className="gap-2">
                {group.components.map((component, index) => (
                  <ComponentItem
                    key={component.id}
                    component={component}
                    index={index}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
          
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
