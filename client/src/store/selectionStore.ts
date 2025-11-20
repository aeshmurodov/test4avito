import { create } from 'zustand';

interface SelectionState {
  selectedIds: Set<number>;
  toggleId: (id: number) => void;
  clearSelection: () => void;
  selectAll: (ids: number[]) => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedIds: new Set(),
  toggleId: (id) =>
    set((state) => {
      const next = new Set(state.selectedIds);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { selectedIds: next };
    }),
  clearSelection: () => set({ selectedIds: new Set() }),
  selectAll: (ids) =>
    set(() => ({
      selectedIds: new Set(ids),
    })),
}));
