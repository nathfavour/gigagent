'use client';

import { create } from 'zustand';

interface AuthModalState {
  isOpen: boolean;
  defaultTab: 'signin' | 'signup';
  openSignIn: () => void;
  openSignUp: () => void;
  close: () => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  defaultTab: 'signin',
  openSignIn: () => set({ isOpen: true, defaultTab: 'signin' }),
  openSignUp: () => set({ isOpen: true, defaultTab: 'signup' }),
  close: () => set({ isOpen: false }),
}));
