import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useSavedForms() {
  const forms = useQuery(api.forms.getAllForms);

  return {
    forms: forms ?? [],
    isLoading: forms === undefined,
  };
}
