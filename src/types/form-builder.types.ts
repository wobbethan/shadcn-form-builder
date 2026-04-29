import { FormComponentModel } from "@/models/FormComponent";
import { Editor } from "@tiptap/react";
import { icons } from "lucide-react";
import { HTMLAttributes, HTMLInputTypeAttribute } from 'react';
import { TemplateDefinition } from "./template.types";
import { FormComponentModelInput } from "./FormComponent.types";

export type SelectableComponents = {
  id: string;
  label: string;
  type: string;
  icon: keyof typeof icons;
};

export type Viewports = 'sm' | 'md' | 'lg';

export type DesignPropertiesViews = {
  base: React.ReactNode;
  grid: React.ReactNode;
  label: React.ReactNode;
  input: React.ReactNode;
  button: React.ReactNode;
  options: React.ReactNode;
  validation: React.ReactNode;
};

export type TemplateData = {
  components: FormComponentModel[];
  formTitle: string;
  formDescription: string;
  tags: string[];
  category: string;
  image?: string;
};

export interface TemplateHydrationPayload extends Omit<TemplateDefinition, "components"> {
  components: Array<FormComponentModelInput | FormComponentModel>;
  templateId?: string | null;
  mode?: 'editor' | 'editor-preview' | 'preview';
  resetHistory?: boolean;
}

export type HistorySnapshot = {
  components: FormComponentModel[];
  formTitle: string;
  formId: string | null;
  timestamp: number;
};

export type HistoryState = {
  snapshots: HistorySnapshot[];
  currentIndex: number;
  maxHistorySize: number;
};

export interface FormBuilderStore {
  mode: 'editor' | 'editor-preview' | 'preview';
  viewport: Viewports;
  formId: string | null;
  formTitle: string;
  loadedTemplateId: string | null;
  loadedTemplate: TemplateData | null;
  editor: Editor | null;
  enableDragging: boolean;
  history: HistoryState;
  updateMode: (mode: FormBuilderStore['mode']) => void;
  updateViewport: (viewport: Viewports) => void;
  updateFormTitle: (title: string) => void;
  updateFormId: (id: string) => void;
  setEditor: (editor: Editor | null) => void;
  components: FormComponentModel[];
  selectedComponent: FormComponentModel | null;
  updateEnableDragging: (enableDragging: boolean) => void;
  addComponent: (component: FormComponentModel) => void;
  removeComponent: (componentId: string) => void;
  updateComponent: (componentId: string, field: string, value: any, isValidForAllViewports?: boolean, isDragging?: boolean) => void;
  updateComponents: (components: FormComponentModel[]) => void;
  selectComponent: (component: FormComponentModel | null) => void;
  moveComponent: (oldIndex: number, newIndex: number) => void;
  duplicateComponent: (componentId: string) => void;
  loadTemplate: (templateName: string, templateKey?: string) => Promise<boolean>;
  clearForm: () => void;
  saveSnapshot: () => void;
  undo: () => boolean;
  redo: () => boolean;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clearHistory: () => void;
  jumpToSnapshot: (index: number) => boolean;
}
