import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "@/entities/form/models/form-component";
import { GridGroup } from "../../../configure-form-fields/ui/groups/grid-group";
import { LabelGroup } from "../../../configure-form-fields/ui/groups/label-group";
import { InputGroup } from "../../../configure-form-fields/ui/groups/input-group";
import { OptionsGroup } from "../../../configure-form-fields/ui/groups/options-group";
import { cn, generateTWClassesForAllViewports } from "@/lib/utils";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { ValidationGroup } from "../../../configure-form-fields/ui/groups/validation-group";
import { FieldLabel } from "@/components/ui/field";

export function FormRadio(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const oneOptionHasLabelDescription = component.options?.some(
    (option) => option.labelDescription
  );
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");
  const cardLayoutClasses = component.getField("properties.style.cardLayout");
  const componentId = component.id;
  const isCard = component.getField("properties.style.asCard") === "yes";
  const WrapperComponent = isCard ? FieldLabel : "div" as React.ElementType;
  return (
    <RadioGroup
      key={component.id}
      id={componentId}
      className={cn("w-full", cardLayoutClasses === "horizontal" && "@3xl:grid-cols-2")}
      value={field.value}
      name={field.name}
      onValueChange={field.onChange}
    >
      {component.options?.map((option) => (
        <WrapperComponent
          key={option.value}
          className={cn("flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3", asCardClasses)}
          htmlFor={`${componentId}-${option.value}`}
        >
          <RadioGroupItem
            value={option.value}
            id={`${componentId}-${option.value}`}
          />
          <div className="grid gap-1 leading-none">
            <FieldLabel
              htmlFor={`${componentId}-${option.value}`}
              className={cn(
                "font-normal",
                oneOptionHasLabelDescription && "font-medium"
              )}
            >
              {option.label}
            </FieldLabel>
            {option.labelDescription && (
              <p className="text-sm text-muted-foreground">
                {option.labelDescription}
              </p>
            )}
          </div>
        </WrapperComponent>
      ))}
    </RadioGroup>
  );
}

export const RadioDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  label: (
    <LabelGroup
      whitelist={["label", "labelPosition", "labelAlign", "showLabel"]}
    />
  ),
  input: <InputGroup whitelist={["placeholder", "description", "value", "asCard", "cardLayout"]} />,
  options: <OptionsGroup />,
  button: null,
  validation: <ValidationGroup />,
};
