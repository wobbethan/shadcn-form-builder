import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { FormComponentModel } from "@/models/FormComponent"
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form"
import { SelectDesignProperties as BaseSelectDesignProperties } from "./form-select"

export function FormNativeSelect(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const componentId = component.id
  const placeholder = component.getField("attributes.placeholder")
  const isRequired =
    component.getField("validations.required") === "yes" ||
    component.getField("attributes.required") === true
  const fieldState = form.getFieldState(field.name, form.formState)

  return (
    <NativeSelect
      key={component.id}
      id={componentId}
      name={field.name}
      className="w-full"
      value={field.value ?? ""}
      onChange={(event) => field.onChange(event.target.value)}
      onBlur={field.onBlur}
      ref={field.ref}
      disabled={component.getField("attributes.disabled")}
      aria-invalid={fieldState.invalid ? "true" : undefined}
    >
      {placeholder && (
        <NativeSelectOption
          value=""
          disabled={isRequired}
          hidden={isRequired}
        >
          {placeholder}
        </NativeSelectOption>
      )}
      {component.options?.map((option) => (
        <NativeSelectOption key={option.value} value={option.value}>
          {option.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}

export const NativeSelectDesignProperties = BaseSelectDesignProperties

