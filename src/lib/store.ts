import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  isLoggedIn: boolean;
  setLoggedIn: (val: boolean) => void;
  hasCompletedOnboarding: boolean;
  setCompletedOnboarding: (val: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  activeTab: 'Dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  onboardingStep: 1,
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  isLoggedIn: false,
  setLoggedIn: (val) => set({ isLoggedIn: val }),
  hasCompletedOnboarding: false,
  setCompletedOnboarding: (val) => set({ hasCompletedOnboarding: val }),
}));
