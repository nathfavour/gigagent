'use client';

import React from 'react';
import AuthModal from '@/components/auth/AuthModal';
import { useAuthModal } from '@/hooks/useAuthModal';

export default function AuthModalProvider() {
  const { isOpen, defaultTab, close } = useAuthModal();

  return (
    <AuthModal 
      open={isOpen} 
      onClose={close} 
      defaultTab={defaultTab}
    />
  );
}
