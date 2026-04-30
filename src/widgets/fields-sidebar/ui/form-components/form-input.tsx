import { Input } from "@/components/ui/input";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { LabelGroup } from "../../../../../temp-src/components/form-builder/sidebar/groups/label-group";
import { InputGroup as SidebarInputGroup } from "../../../../../temp-src/components/form-builder/sidebar/groups/input-group";
import { GridGroup } from "../../../../../temp-src/components/form-builder/sidebar/groups/grid-group";
import { cn } from "@/lib/utils";
import { ValidationGroup } from "../../../../../temp-src/components/form-builder/sidebar/groups/validation-group";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { Icon } from "../../../../../temp-src/components/form-builder/helpers/icon-render";
import {
  InputGroupAddon,
  InputGroupInput,
  InputGroup,
} from "@/components/ui/input-group";

export function FormInput(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const IconName = component.getField("properties.style.icon");
  const IconStrokeWidth = component.getField(
    "properties.style.iconStrokeWidth"
  );
  const IconPosition = component.getField("properties.style.iconPosition");

  return IconName ? (
    <InputGroup>
      <InputGroupInput
        key={component.id}
        placeholder={component.getField("attributes.placeholder")}
        type={component.getField("attributes.type")}
        {...field}
      />
      {IconName && (
        <InputGroupAddon
          align={IconPosition === "left" ? "inline-start" : "inline-end"}
        >
          <Icon
            name={IconName}
            className="size-4"
            strokeWidth={IconStrokeWidth}
          />
        </InputGroupAddon>
      )}
    </InputGroup>
  ) : (
    <Input
      key={component.id}
      placeholder={component.getField("attributes.placeholder")}
      type={component.getField("attributes.type")}
      {...field}
    />
  );
}

export const InputDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  label: (
    <LabelGroup
      whitelist={["label", "labelPosition", "labelAlign", "showLabel"]}
    />
  ),
  input: <SidebarInputGroup />,
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
