import {
  cn,
  generateTWClassesForAllViewports,
} from "@/lib/utils";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { UseFormReturn, FieldValues, ControllerRenderProps } from "react-hook-form";

export function Text(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) {
  const colSpanClasses = generateTWClassesForAllViewports(component, "colSpan");
  const colStartClasses = generateTWClassesForAllViewports(
    component,
    "colStart"
  );

  return (
    <div
      key={component.id}
      className={cn(
        colSpanClasses,
        colStartClasses      )}
      dangerouslySetInnerHTML={{ __html: component.content || "" }}
    />
  );
}

export const TextDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  label: null,
  input: null,
  options: null,
  button: null,
  validation: null,
};
