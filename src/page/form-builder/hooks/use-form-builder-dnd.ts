"use client";

import {
  closestCenter,
  DndContextProps,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { useFormBuilderStore } from "@/shared/stores/form-builder-store";
import { getGridRows, updateColSpans } from "@/lib/utils";
import { FormComponentModel } from "@/entities/form/models/form-component";

interface DragItemData {
  action: "move" | "add";
  component: FormComponentModel;
  index: number;
}

interface DropTargetData {
  component: FormComponentModel;
  position: "top" | "bottom" | "left" | "right";
  index: number;
}

interface UseFormBuilderDndResult {
  sensors: DndContextProps["sensors"];
  collisionDetection: DndContextProps["collisionDetection"];
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  draggingDOMElement: HTMLElement | null;
}

export function useFormBuilderDnd(): UseFormBuilderDndResult {
  const viewport = useFormBuilderStore((state) => state.viewport);
  const components = useFormBuilderStore((state) => state.components);
  const selectComponent = useFormBuilderStore((state) => state.selectComponent);
  const updateComponent = useFormBuilderStore((state) => state.updateComponent);
  const moveComponent = useFormBuilderStore((state) => state.moveComponent);
  const addComponent = useFormBuilderStore((state) => state.addComponent);

  const [draggingDOMElement, setDraggingDOMElement] =
    useState<HTMLElement | null>(null);

  const gridRows = getGridRows(components, viewport);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 20,
    },
  });
  const sensors = useMemo(() => [pointerSensor], [pointerSensor]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const activeData = active.data.current as DragItemData | undefined;
    const overData = over.data.current as DropTargetData | undefined;
    if (!activeData || !overData) {
      return;
    }

    const { action, index: activeIndex } = activeData;
    let activeComponent = activeData.component;
    const { component: overComponent, position, index: overIndex } = overData;

    if (action === "add") {
      addComponent(activeComponent);
      const justAddedComponent = useFormBuilderStore
        .getState()
        .components.at(-1);
      if (!justAddedComponent) {
        return;
      }
      activeComponent = justAddedComponent;
    }

    if (
      (activeIndex === overIndex && (position === "left" || position === "right")) ||
      (activeIndex - overIndex === 1 && position === "bottom") ||
      (overIndex - activeIndex === 1 && position === "top")
    ) {
      return;
    }

    if (!activeComponent || !overComponent) {
      return;
    }

    const overRowItems =
      gridRows.find((row) =>
        row.some((item) => item.id === overComponent.id)
      ) || [];
    if (!overRowItems.length) {
      return;
    }

    const overRowFirstItemIndex = components.findIndex(
      (component) => component.id === overRowItems[0].id
    );
    const overRowLastItemIndex = components.findIndex(
      (component) => component.id === overRowItems[overRowItems.length - 1].id
    );

    let activeRowItems =
      gridRows.find((row) =>
        row.some((item) => item.id === activeComponent.id)
      ) || [];

    const draggingInSameRow = overRowItems === activeRowItems;
    activeRowItems = activeRowItems.filter((item) => item.id !== activeComponent.id);

    const updatedOverItems =
      position === "top" || position === "bottom"
        ? updateColSpans([activeComponent])
        : updateColSpans([...overRowItems, activeComponent]);

    if (
      (!draggingInSameRow && (position === "left" || position === "right")) ||
      position === "top" ||
      position === "bottom"
    ) {
      updatedOverItems.forEach((item) => {
        updateComponent(
          item.id,
          "properties.style.colSpan",
          `${item.span}`,
          false,
          true
        );
      });

      const updatedActiveItems = updateColSpans([...activeRowItems]);
      updatedActiveItems.forEach((item) => {
        updateComponent(
          item.id,
          "properties.style.colSpan",
          `${item.span}`,
          false,
          true
        );
      });
    }

    const oldIndex = activeIndex;
    let newIndex =
      position === "left"
        ? overIndex
        : activeIndex < overIndex
          ? overIndex
          : overIndex + 1;

    if (position === "top") {
      newIndex =
        activeIndex < overIndex
          ? overRowFirstItemIndex - 1
          : overRowFirstItemIndex;
    }

    if (position === "bottom") {
      newIndex =
        activeIndex < overIndex
          ? overRowLastItemIndex
          : overRowLastItemIndex + 1;
    }

    moveComponent(oldIndex, newIndex);
  };

  const handleDragStart = (event: DragStartEvent) => {
    selectComponent(null);
    const element = document.querySelector(
      `[data-item-id="${event.active.data.current?.component.id}"]`
    );
    if (element) {
      setDraggingDOMElement(element as HTMLElement);
      return;
    }
    setDraggingDOMElement(null);
  };

  return {
    sensors,
    collisionDetection: closestCenter,
    handleDragStart,
    handleDragEnd,
    draggingDOMElement,
  };
}
