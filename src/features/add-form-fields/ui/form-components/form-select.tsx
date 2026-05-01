import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "@/entities/form/models/form-component";
import { GridGroup } from "../../../configure-form-fields/ui/groups/grid-group";
import { LabelGroup } from "../../../configure-form-fields/ui/groups/label-group";
import { InputGroup } from "../../../configure-form-fields/ui/groups/input-group";
import { OptionsGroup } from "../../../configure-form-fields/ui/groups/options-group";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { ValidationGroup } from "../../../configure-form-fields/ui/groups/validation-group";

export function FormSelect(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) {
  return (
    <Select key={component.id} value={field.value} name={field.name} onValueChange={field.onChange}>
      <SelectTrigger id={component.id} className="w-full">
        <SelectValue placeholder={component.getField("attributes.placeholder")} />
      </SelectTrigger>
      <SelectContent>
        {component.options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}


export const SelectDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  label: <LabelGroup whitelist={["label", "labelPosition", "labelAlign", "showLabel"]} />,
  input: <InputGroup whitelist={["placeholder", "description", "value"]} />,
  options: <OptionsGroup />,
  button: null,
  validation: <ValidationGroup />,
};
