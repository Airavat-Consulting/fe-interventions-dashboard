import create from 'zustand';
import { persist } from 'zustand/middleware';
import type { RoadProduct, SeaProduct, EtsSettings, ScenarioItem } from './types';

export interface AppState {
  roadProducts: RoadProduct[];
  seaProducts: SeaProduct[];
  etsSettings: EtsSettings | null;
  scenario: ScenarioItem[];
  setRoadProducts: (products: RoadProduct[]) => void;
  setSeaProducts: (products: SeaProduct[]) => void;
  setEtsSettings: (settings: EtsSettings) => void;
  addToScenario: (item: ScenarioItem) => void;
  removeFromScenario: (productId: string) => void;
  clearScenario: () => void;
}

export const useAppState = create<AppState>()(
  persist(
    (set, get) => ({
      roadProducts: [],
      seaProducts: [],
      etsSettings: null,
      scenario: [],
      setRoadProducts: (products) => set({ roadProducts: products }),
      setSeaProducts: (products) => set({ seaProducts: products }),
      setEtsSettings: (settings) => set({ etsSettings: settings }),
      addToScenario: (item) => {
        const existing = get().scenario.find((i) => i.productId === item.productId && i.type === item.type);
        if (existing) {
          const updated = get().scenario.map((i) =>
            i.productId === item.productId && i.type === item.type ? { ...i, quantity: i.quantity + item.quantity } : i
          );
          set({ scenario: updated });
        } else {
          set({ scenario: [...get().scenario, item] });
        }
      },
      removeFromScenario: (productId) => {
        set({ scenario: get().scenario.filter((i) => i.productId !== productId) });
      },
      clearScenario: () => set({ scenario: [] })
    }),
    {
      name: 'fe-dashboard-storage'
    }
  )
);