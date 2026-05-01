import { FormComponentModel } from "@/entities/form/models/form-component";
export const generateJsonSchema = (components: FormComponentModel[]) => {
  return {
    components,
    validation: {},
    };
  };
