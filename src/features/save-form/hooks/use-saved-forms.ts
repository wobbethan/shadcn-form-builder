import { useGetAllForms } from "@/entities/form/api/get-all-forms";

export function useSavedForms() {
  const forms = useGetAllForms();

  return {
    forms: forms ?? [],
    isLoading: forms === undefined,
  };
}
