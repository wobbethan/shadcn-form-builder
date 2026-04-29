import { useFormBuilderStore } from "@/stores/form-builder-store";

/**
 * Undo/redo and snapshot navigation for the form builder.
 */
export const useHistory = () => {
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    saveSnapshot,
    clearHistory,
    jumpToSnapshot,
    history,
  } = useFormBuilderStore();

  return {
    undo,
    redo,
    saveSnapshot,
    clearHistory,
    jumpToSnapshot,

    canUndo: canUndo(),
    canRedo: canRedo(),
    historyLength: history.snapshots.length,
    currentIndex: history.currentIndex,
    snapshots: history.snapshots,

    hasHistory: history.snapshots.length > 1,
    isAtBeginning: history.currentIndex === 0,
    isAtEnd: history.currentIndex === history.snapshots.length - 1,
  };
};
