"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DesignPropertiesViews } from "@/types/form-builder.types"
import { GridGroup } from "../../../configure-form-fields/ui/groups/grid-group"
import { LabelGroup } from "../../../configure-form-fields/ui/groups/label-group"
import { InputGroup } from "../../../configure-form-fields/ui/groups/input-group"    
import { FormComponentModel } from "@/entities/form/models/form-component"
import { ControllerRenderProps, FieldValues, UseFormReturn } from "react-hook-form"
import { ValidationGroup } from "../../../configure-form-fields/ui/groups/validation-group"

export function FormDatePicker(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal w-full",
            !field.value && "text-muted-foreground"
          )}
          id={component.id}
          {...field}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? field.value.toLocaleDateString() : <span className="text-muted-foreground">{component.getField("attributes.placeholder")}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          initialFocus
          selected={field.value}
          onSelect={field.onChange}
        />
      </PopoverContent>
    </Popover>
  )
}


export const DatePickerDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  label: <LabelGroup whitelist={["label", "labelPosition", "labelAlign", "showLabel"]} />,
  input: <InputGroup whitelist={["placeholder", "description"]} />,
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
