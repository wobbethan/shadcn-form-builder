import { Textarea } from "@/components/ui/textarea";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { InputGroup } from "../sidebar/groups/input-group";
import { GridGroup } from "../sidebar/groups/grid-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { ValidationGroup } from "../sidebar/groups/validation-group";

export function FormTextarea(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) {
  return (
    <Textarea
    key={component.id}
      id={component.id}
      placeholder={component.getField("attributes.placeholder")}
      {...field}
    />
  );
}

export const TextareaDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  label: <LabelGroup whitelist={["label", "labelPosition", "labelAlign", "showLabel"]} />,
  input: <InputGroup whitelist={["placeholder", "description", "value"]} />,
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
