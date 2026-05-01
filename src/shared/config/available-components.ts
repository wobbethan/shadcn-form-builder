import { Viewports } from "@/types/form-builder.types";
import { FormComponentModel } from "@/entities/form/models/form-component";
import {
  // Form Components
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormRadio,
  FormSwitch,
  FormButton,
  FormDatePicker,
  FormCheckboxGroup,
  
  // Typography Components
  Text,

  // Form Design Properties
  InputDesignProperties,
  TextareaDesignProperties,
  SelectDesignProperties,
  CheckboxDesignProperties,
  RadioDesignProperties,
  SwitchDesignProperties,
  ButtonDesignProperties,
  DatePickerDesignProperties,
  CheckboxGroupDesignProperties,
  // Typography Design Properties
  TextDesignProperties,
  } from "@/features/add-form-fields/ui/form-components";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FieldValues } from "react-hook-form";

const typographyComponents: FormComponentModel[] = [
  new FormComponentModel({
    id: "text",
    label: "Text block",
    label_info: "WYSIWYG Editor",
    type: "text",
    category: "content",
    icon: "Text",
    content: "Text",
  })
];

const formComponents: FormComponentModel[] = [
  new FormComponentModel({
    id: "text-input",
    label: "Text",
    label_info: "Single line text input",
    type: "input",
    category: "form",
    icon: "TextCursorInput",
    attributes: { type: "text" },
  }),
  new FormComponentModel({
    id: "textarea",
    label: "Text Area",
    label_info: "Multi-line text input",
    type: "textarea",
    category: "form",
    icon: "AlignLeft",
  }),
  new FormComponentModel({
    id: "number-input",
    label: "Number",
    label_info: "Input field for numeric values",
    type: "number",
    category: "form",
    icon: "Hash",
    attributes: { type: "number" },
  }),
  new FormComponentModel({
    id: "email-input",
    label: "Email",
    label_info: "Input field for email addresses",
    type: "email",
    category: "form",
    icon: "Mail",
    attributes: { type: "email" },
  }),
  new FormComponentModel({
    id: "file-input",
    label: "File upload",
    label_info: "Input field for file uploads",
    type: "file",
    category: "form",
    icon: "Upload",
    attributes: { type: "file" },
  }),
  new FormComponentModel({
    id: "tel-input",
    label: "Telephone",
    label_info: "Input field for telephone numbers",
    type: "tel",
    category: "form",
    icon: "Phone",
    attributes: { type: "tel" },
  }),
  new FormComponentModel({
    id: "select",
    label: "Select",
    label_info: "Dropdown select",
    type: "select",
    category: "form",
    icon: "List",
    options: [
      { value: "option1", label: "Option 1", labelDescription: "Option 1 Description" },
      { value: "option2", label: "Option 2", labelDescription: "Option 2 Description" },
    ],
  }),
  new FormComponentModel({
    id: "checkbox",
    label: "Checkbox",
    label_info: "Checkbox input",
    label_description: "Checkbox Description",
    type: "checkbox",
    category: "form",
    icon: "SquareCheck",
    properties: {
      style: {
        showLabel: "no",
      },
    },
  }),
  new FormComponentModel({
    id: "checkbox-group",
    label: "Checkbox Group",
    label_info: "Group of checkboxes",
    type: "checkbox-group",
    category: "form",
    icon: "ListChecks",
    options: [
      { value: "option1", label: "Option 1", labelDescription: "Option 1 Description", checked: true },
      { value: "option2", label: "Option 2", labelDescription: "Option 2 Description" },
    ],
  }),
  new FormComponentModel({
    id: "radio",
    label: "Radio Group",
    label_info: "Group of radio buttons",
    type: "radio",
    category: "form",
    icon: "CircleDot",
    options: [
      { value: "option1", label: "Option 1", labelDescription: "Option 1 Description" },
      { value: "option2", label: "Option 2", labelDescription: "Option 2 Description" },
    ],
  }),
  new FormComponentModel({
    id: "date",
    label: "Date Picker",
    label_info: "Date picker input",
    type: "date",
    category: "form",
    icon: "Calendar",
    attributes: { placeholder: "Pick a date" },
  }),
  new FormComponentModel({
    id: "switch",
    label: "Switch",
    label_info: "Toggle switch",
    label_description: "Switch Description",
    type: "switch",
    category: "form",
    icon: "ToggleLeft",
    properties: {
      style: {
        showLabel: "no",
      },
    },
  }),
  new FormComponentModel({
    id: "submit-button",
    label: "Submit",
    label_info: "Button to submit form",
    content: "Submit",
    type: "submit-button",
    category: "form",
    icon: "SquareMousePointer",
    properties: { style: { showLabel: "no" } },
    attributes: { type: "submit" }
  }),
  new FormComponentModel({
    id: "reset-button",
    label: "Reset",
    label_info: "Button to reset form input values",
    content: "Reset",
    type: "reset-button",
    category: "form",
    icon: "SquareMousePointer",
    properties: { style: { showLabel: "no" }, variant: "outline" },
    attributes: { type: "reset" }
  }),
];

export const AVAILABLE_COMPONENTS: FormComponentModel[] = [...typographyComponents, ...formComponents];

const typographyViews = {
  text: { render: (component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) => Text(component, form, field), renderDesignProperties: TextDesignProperties },
};

const formViews = {
  input: { render: FormInput, renderDesignProperties: InputDesignProperties },
  textarea: { render: FormTextarea, renderDesignProperties: TextareaDesignProperties },
  select: { render: FormSelect, renderDesignProperties: SelectDesignProperties },
  checkbox: { render: FormCheckbox, renderDesignProperties: CheckboxDesignProperties },
  "checkbox-group": { render: FormCheckboxGroup, renderDesignProperties: CheckboxGroupDesignProperties },
  radio: { render: FormRadio, renderDesignProperties: RadioDesignProperties },
  switch: { render: FormSwitch, renderDesignProperties: SwitchDesignProperties },
  "submit-button": { render: FormButton, renderDesignProperties: ButtonDesignProperties },
  "reset-button": { render: FormButton, renderDesignProperties: ButtonDesignProperties },
  date: { render: FormDatePicker, renderDesignProperties: DatePickerDesignProperties },
};

const views = {
  ...typographyViews,
  ...formViews,
  number: formViews.input,
  email: formViews.input,
  tel: formViews.input,
  file: formViews.input,
};

export function getCoponentSidebarOptions(component: FormComponentModel) {

  const componentView = views[component.type as keyof typeof views];
  if (!componentView) return undefined;

  return componentView.renderDesignProperties;
}

export function renderComponent(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps): React.ReactNode | undefined {

  const componentView = views[component.type as keyof typeof views];
  if (!componentView) return undefined;

  return componentView.render(component, form, field)
}
