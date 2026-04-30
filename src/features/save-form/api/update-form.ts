import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export function useUpdateFormMutation() {
  return useMutation(api.forms.updateForm);
}
