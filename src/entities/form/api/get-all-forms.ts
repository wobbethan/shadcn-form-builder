import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export function useGetAllForms() {
  return useQuery(api.forms.getAllForms);
}