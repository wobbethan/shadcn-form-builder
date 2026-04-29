import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { cn, generateTWClassesForAllViewports } from "@/lib/utils";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { ValidationGroup } from "../sidebar/groups/validation-group";
import { FieldLabel } from "@/components/ui/field";

export function FormCheckbox(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");
  const componentId = component.id;
  const isCard = component.getField("properties.style.asCard") === "yes";
  const WrapperComponent = isCard ? FieldLabel : "div" as React.ElementType;

  return (
    <WrapperComponent
      key={component.id}
      className={cn(
        "w-full flex items-start has-[[data-state=checked]]:border-primary space-x-3",
        asCardClasses,
      )}
      htmlFor={componentId}
    >
      <Checkbox
        id={componentId}
        name={field.name}
        checked={field.value}
        onCheckedChange={field.onChange}
      />
      <div className="grid gap-1.5 leading-none">
        <FieldLabel htmlFor={componentId}>{component.getField("label")}</FieldLabel>
        <p className="text-sm text-muted-foreground">
          {component.getField("label_description")}
        </p>
      </div>
    </WrapperComponent>
  );
}

export const CheckboxDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  label: <LabelGroup whitelist={["label", "label_description"]} />,
  input: <InputGroup whitelist={["description", "asCard", "checked"]} />,
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
