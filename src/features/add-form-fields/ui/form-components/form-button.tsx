import { Button } from "@/components/ui/button";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "@/entities/form/models/form-component";
import { GridGroup } from "../../../configure-form-fields/ui/groups/grid-group";
import { ButtonGroup } from "../../../configure-form-fields/ui/groups/button-group";
import { UseFormReturn, FieldValues, ControllerRenderProps } from "react-hook-form";
import { Icon } from "../../../../shared/lib/icon-render";

export function FormButton(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) {
  const IconName = component.getField("properties.style.icon");
  const IconStrokeWidth = component.getField(
    "properties.style.iconStrokeWidth"
  );
  const IconPosition = component.getField("properties.style.iconPosition");
  let IconEl = <Icon name={IconName} className="size-4" strokeWidth={IconStrokeWidth} />

  return (
    <Button
      key={component.id}
      id={component.id}
      className="w-full"
      type={component.getField("attributes.type")}
      variant={component.getField("properties.variant")}
    >

      {IconName && IconPosition === "left" ? IconEl : null}
      {component.getField("content")}
      {IconName && IconPosition === "right" ? IconEl : null}
    </Button>
  );
}

export const ButtonDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  label: null,
  input: null,
  button: <ButtonGroup />,
  options: null,
  validation: null,
};
