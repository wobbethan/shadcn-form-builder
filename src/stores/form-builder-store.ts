import { create } from "zustand";
import { FormBuilderStore, TemplateData, Viewports, HistorySnapshot, HistoryState } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { Editor } from "@tiptap/react";
import { DEFAULT_MAX_HISTORY_SIZE } from "@/lib/history-utils";
import { TEMPLATE_FALLBACK_SOURCE } from "@/lib/templates/constants";

const generateComponentId = (
  component: FormComponentModel,
  components: FormComponentModel[]
): string => {
  const existingTypes = components.filter((comp) =>
    comp.getField("type").startsWith(component.getField("type"))
  );

  let counter = existingTypes.length;
  let newId = `${component.getField("id")}-${counter}`;

  return newId;
};

const createSnapshot = (components: FormComponentModel[], formTitle: string, formId: string | null): HistorySnapshot => ({
  components: components.map(comp => new FormComponentModel({ ...comp })),
  formTitle,
  formId,
  timestamp: Date.now()
});

const initializeHistory = (): HistoryState => ({
  snapshots: [],
  currentIndex: -1,
  maxHistorySize: DEFAULT_MAX_HISTORY_SIZE
});

const loadTemplate = async (templateName: string, templateKey?: string): Promise<TemplateData | null> => {
  try {    
    const response = await fetch(`/templates/${templateName}.json`);
    let templateData: Record<string, any>;

    if (!response.ok) {
      const fallbackResponse = await fetch(`/templates/${TEMPLATE_FALLBACK_SOURCE}.json`);
      if (!fallbackResponse.ok) {
        throw new Error(`Failed to load template: ${templateName} - Status: ${response.status}`);
      }
      templateData = await fallbackResponse.json();
    } else {
      templateData = await response.json();
    }

    const template = templateKey ? templateData[templateKey] : Object.values(templateData)[0];
    
    if (!template || !template.components) {
      throw new Error(`Template not found: ${templateKey || 'default'} in ${templateName}.json`);
    }
        
    const components = template.components.map((component: any) => {
      return new FormComponentModel(component);
    });
    
    return {
      components,
      formTitle: template.formTitle,
      formDescription: template.formDescription,
      tags: template.tags,
      category: template.category
    };
  } catch (error) {
    console.error('Error loading template:', (error as Error).message);
    throw error;
  }
};

export const useFormBuilderStore = create<FormBuilderStore>()((set, get) => ({
  mode: "editor",
  components: [],
  selectedComponent: null,
  viewport: "md",
  formId: null,
  formTitle: "",
  loadedTemplateId: null,
  loadedTemplate: null,
  editor: null,
  enableDragging: true,
  history: initializeHistory(),
  updateMode: (mode: FormBuilderStore['mode']) => set({ mode }),
  updateViewport: (viewport: Viewports) => set({ viewport }),
  updateFormTitle: (title: string) => set({ formTitle: title }),
  updateFormId: (id: string) => set({ formId: id }),
  updateEnableDragging: (enableDragging: boolean) =>
    set({ enableDragging }),
  setEditor: (editor: Editor | null) => set({ editor }),
  addComponent: (component: FormComponentModel) => {
    const newComponent = new FormComponentModel({ ...component });
    let newId = generateComponentId(newComponent, get().components);
    newComponent.id = newId;
    newComponent.attributes = {
      ...newComponent.attributes,
      id: newComponent.id,
    };
    set((state) => {
      return { components: [...state.components, newComponent] };
    });

    get().saveSnapshot();
    return newComponent;
  },
  removeComponent: (componentId: string) => {
    set((state) => {
      return {
        components: state.components.filter(
          (component) => component.id !== componentId
        ),
        selectedComponent: state.selectedComponent?.id === componentId ? null : state.selectedComponent,
      };
    });
    
    get().saveSnapshot();
  },
  updateComponent: (
    componentId: string,
    field: string,
    value: any,
    isValidForAllViewports: boolean = false,
    isDragging: boolean = false
  ) => {
    set((state) => {
      const updateNestedField = (
        obj: any,
        path: string[],
        value: any
      ): any => {
        if (path.length === 1) {
          return { ...obj, [path[0]]: value };
        }
        const [current, ...rest] = path;
        return {
          ...obj,
          [current]: updateNestedField(obj[current] || {}, rest, value),
        };
      };

      const fieldPath = field.split(".");
      const viewport = state.viewport;
      let updatedComponent = null;

      return {
        components: state.components.map((component) => {
          if (component.id !== componentId) return component;

          updatedComponent = component;

          if (viewport !== "sm" && !isValidForAllViewports) {
            const overrides =
              component.overrides || ({} as Record<Viewports, any>);
            const viewportOverrides = overrides[viewport] || {};

            updatedComponent = new FormComponentModel({
              ...component,
              overrides: {
                ...overrides,
                [viewport]: updateNestedField(
                  viewportOverrides,
                  fieldPath,
                  value
                ),
              },
            });
            return updatedComponent;
          }

          const nestedField = updateNestedField(
            component,
            fieldPath,
            value
          );

          updatedComponent = new FormComponentModel({
            ...component,
            ...nestedField,
          });
          return updatedComponent;
        }),
        selectedComponent: isDragging ? null : updatedComponent,
      };
    });

    if (!isDragging) {
      get().saveSnapshot();
    }
  },
  updateComponents: (components: FormComponentModel[]) => {
    set({ components });
    get().saveSnapshot();
  },
  selectComponent: (component: FormComponentModel | null) =>
    set(() => {
      return {
        selectedComponent: component
          ? new FormComponentModel(component)
          : null,
        editor: component === null || component.category === "form" ? null : get().editor,
      };
    }),
  moveComponent: (oldIndex: number, newIndex: number) => {
    set((state) => {
      const components = [...state.components];

      if (oldIndex === undefined) {
        oldIndex = components.length - 1;
      }

      const [movedComponent] = components.splice(oldIndex, 1);
      components.splice(newIndex, 0, movedComponent);

      return { components, selectedComponent: null };
    });
    
    get().saveSnapshot();
  },
  duplicateComponent: (componentId: string) => {
    const state = get();
    const componentToDuplicate = state.components.find(comp => comp.id === componentId);
    
    if (!componentToDuplicate) {
      console.warn(`Component with id ${componentId} not found for duplication`);
      return;
    }

    const duplicatedComponent = new FormComponentModel({ ...componentToDuplicate });
    
    const newId = generateComponentId(duplicatedComponent, state.components);
    duplicatedComponent.id = newId;
    duplicatedComponent.attributes = {
      ...duplicatedComponent.attributes,
      id: duplicatedComponent.id,
    };

    set((state) => ({
      components: [...state.components, duplicatedComponent],
      selectedComponent: duplicatedComponent,
    }));
    
    get().saveSnapshot();
  },
  loadTemplate: async (templateName: string, templateKey?: string) => {
    const templateData = await loadTemplate(templateName, templateKey);
    if (templateData) {
      set({
        components: templateData.components,
        formTitle: templateData.formTitle,
        selectedComponent: null,
        mode: "editor",
        loadedTemplateId: templateKey || null,
        loadedTemplate: templateData
      });
      
      get().clearHistory();
      get().saveSnapshot();
      return true;
    }
    return false;
  },
  clearForm: () => {
    set({
      components: [],
      selectedComponent: null,
      mode: "editor",
      loadedTemplateId: null,
      loadedTemplate: null
    });
    
    get().clearHistory();
    get().saveSnapshot();
  },
  saveSnapshot: () => {
    const state = get();
    const snapshot = createSnapshot(state.components, state.formTitle, state.formId);
    
    set((state) => {
      const newHistory = { ...state.history };
      
      newHistory.snapshots = newHistory.snapshots.slice(newHistory.currentIndex);
      
      newHistory.snapshots.unshift(snapshot);
      newHistory.currentIndex = 0;
      
      if (newHistory.snapshots.length > newHistory.maxHistorySize) {
        newHistory.snapshots = newHistory.snapshots.slice(0, newHistory.maxHistorySize);
      }
      
      return { history: newHistory };
    });
  },
  undo: () => {
    const state = get();
    if (state.history.currentIndex < state.history.snapshots.length - 1) {
      const newIndex = state.history.currentIndex + 1;
      const snapshot = state.history.snapshots[newIndex];
      
      set({
        components: snapshot.components.map(comp => new FormComponentModel({ ...comp })),
        formTitle: snapshot.formTitle,
        formId: snapshot.formId,
        selectedComponent: null,
        history: {
          ...state.history,
          currentIndex: newIndex
        }
      });
      return true;
    }
    return false;
  },
  redo: () => {
    const state = get();
    if (state.history.currentIndex > 0) {
      const newIndex = state.history.currentIndex - 1;
      const snapshot = state.history.snapshots[newIndex];
      
      set({
        components: snapshot.components.map(comp => new FormComponentModel({ ...comp })),
        formTitle: snapshot.formTitle,
        formId: snapshot.formId,
        selectedComponent: null,
        history: {
          ...state.history,
          currentIndex: newIndex
        }
      });
      return true;
    }
    return false;
  },
  canUndo: () => {
    const state = get();
    return state.history.currentIndex < state.history.snapshots.length - 1;
  },
  canRedo: () => {
    const state = get();
    return state.history.currentIndex > 0;
  },
  clearHistory: () => {
    set({
      history: initializeHistory()
    });
  },
  jumpToSnapshot: (index: number) => {
    const state = get();
    if (index >= 0 && index < state.history.snapshots.length) {
      const snapshot = state.history.snapshots[index];
      
      set({
        components: snapshot.components.map(comp => new FormComponentModel({ ...comp })),
        formTitle: snapshot.formTitle,
        formId: snapshot.formId,
        selectedComponent: null,
        history: {
          ...state.history,
          currentIndex: index
        }
      });
      return true;
    }
    return false;
  },
}));
