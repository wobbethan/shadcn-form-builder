"use client";

import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { renderComponent } from "@/shared/config/available-components";
import { FormComponentModel } from "@/entities/form/models/form-component";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface ComponentPreviewProps {
  component: FormComponentModel;
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  const form = useForm({
    defaultValues: getDefaultValues(component),
    mode: "onSubmit",
  });

  // Generate a unique field name for this component to prevent autofill
  const fieldName = `preview_${component.id}`;

  const renderedComponent = renderComponent(component, form, {
    name: fieldName,
    value: form.watch(fieldName),
    onChange: (value: any) => form.setValue(fieldName, value.target?.value || value),
    onBlur: () => {},
    ref: () => {},
    
  });

  const showLabel = component.getField("properties.style.showLabel") !== "no";
  const label = component.getField("label") || component.label;
  const labelDescription = component.getField("label_description") || component.label_description;

  return (
      <Field>
        {showLabel && label && (
          <div className="space-y-1">
            <Label className="text-sm font-medium" htmlFor={component.id}>
              {label}
              {component.getField("validations.required") === "yes" && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            {labelDescription && (
              <p className="text-xs text-muted-foreground">{labelDescription}</p>
            )}
          </div>
        )}
        
        <Controller
          name={fieldName}
          control={form.control}
          render={() => (renderedComponent as React.ReactElement) || <div>Preview not available</div>}
        />
      </Field>
  );
}

function getDefaultValues(component: FormComponentModel): Record<string, any> {
  const fieldName = `preview_${component.id}`;
  
  switch (component.type) {
    case "input":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "email":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "tel":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "number":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "textarea":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "select":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "checkbox":
      return {
        [fieldName]: component.getField("attributes.checked") || false,
      };
    
    case "checkbox-group":
      return {
        [fieldName]: component.options
          ?.filter(option => option.checked)
          .map(option => option.value) || [],
      };
    
    case "radio":
      return {
        [fieldName]: component.getField("attributes.value") || 
          (component.options?.[0]?.value) || "",
      };
    
    case "switch":
      return {
        [fieldName]: component.getField("attributes.checked") || false,
      };
    
    case "date":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "submit-button":
    case "reset-button":
    case "text":
      return {
        [fieldName]: "",
      };
    
    default:
      return {
        [fieldName]: "",
      };
  }
}
