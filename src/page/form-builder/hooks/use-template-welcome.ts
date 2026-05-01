"use client";

import { useFormBuilderStore } from "@/shared/stores/form-builder-store";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface UseTemplateWelcomeResult {
  isLoadingTemplate: boolean;
  showWelcomeDialog: boolean;
  setShowWelcomeDialog: (open: boolean) => void;
  handleStartFromScratch: () => void;
}

export function useTemplateWelcome(): UseTemplateWelcomeResult {
  const searchParams = useSearchParams();

  const mode = useFormBuilderStore((state) => state.mode);
  const loadedTemplateId = useFormBuilderStore((state) => state.loadedTemplateId);
  const loadTemplate = useFormBuilderStore((state) => state.loadTemplate);
  const components = useFormBuilderStore((state) => state.components);
  const formTitle = useFormBuilderStore((state) => state.formTitle);
  const updateFormTitle = useFormBuilderStore((state) => state.updateFormTitle);
  const saveSnapshot = useFormBuilderStore((state) => state.saveSnapshot);

  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);

  useEffect(() => {
    const template = searchParams.get("template");
    const templateKey = searchParams.get("key");

    if (template && loadedTemplateId !== templateKey && !isLoadingTemplate) {
      setIsLoadingTemplate(true);
      loadTemplate(template, templateKey || undefined)
        .then((success) => {
          if (success) {
            console.log(
              `Template loaded successfully: ${template}${templateKey ? ` (${templateKey})` : ""}`
            );
            return;
          }
          window.location.href = "/";
        })
        .catch((error: unknown) => {
          console.error("Error loading template:", error);
          window.location.href = "/";
        })
        .finally(() => {
          setIsLoadingTemplate(false);
        });
    }
  }, [isLoadingTemplate, loadTemplate, loadedTemplateId, searchParams]);

  useEffect(() => {
    if (isLoadingTemplate || mode !== "editor") {
      return;
    }

    const template = searchParams.get("template");
    if (template) {
      return;
    }

    const shouldShow = !loadedTemplateId && components.length === 0 && !formTitle;
    setShowWelcomeDialog(shouldShow);
  }, [
    components.length,
    formTitle,
    isLoadingTemplate,
    loadedTemplateId,
    mode,
    searchParams,
  ]);

  const handleStartFromScratch = () => {
    setShowWelcomeDialog(false);
    updateFormTitle("Untitled Form");
    saveSnapshot();
  };

  return {
    isLoadingTemplate,
    showWelcomeDialog,
    setShowWelcomeDialog,
    handleStartFromScratch,
  };
}
