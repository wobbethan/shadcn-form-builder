import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "@/entities/form/models/form-component";
import { GridGroup } from "../../../configure-form-fields/ui/groups/grid-group";
import { LabelGroup } from "../../../configure-form-fields/ui/groups/label-group";
import { InputGroup } from "../../../configure-form-fields/ui/groups/input-group";
import { cn, generateTWClassesForAllViewports } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { ValidationGroup } from "../../../configure-form-fields/ui/groups/validation-group";
import { FieldLabel } from "@/components/ui/field";

export function FormSwitch(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) {
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");
  const componentId = component.id;
  const isCard = component.getField("properties.style.asCard") === "yes";
  const WrapperComponent = isCard ? FieldLabel : "div" as React.ElementType;

  return (
    <WrapperComponent
      key={component.id}
      className={cn(asCardClasses, "flex justify-between items-center w-full has-[[data-state=checked]]:border-primary")}
      htmlFor={componentId}
    >
      <div className="grid gap-1 leading-none">
        <FieldLabel>
          {component.getField("label")}
        </FieldLabel>
        <p className="text-sm text-muted-foreground">
          {component.getField("label_description")}
        </p>
      </div>
      <Switch id={componentId} name={field.name} checked={field.value} onCheckedChange={field.onChange} />
    </WrapperComponent>
  );
}

export const SwitchDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  label: <LabelGroup whitelist={["label", "label_description"]} />,
  input: <InputGroup whitelist={["description", "asCard", "checked"]} />,
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
