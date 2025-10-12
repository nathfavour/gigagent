import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/hooks/useAuthModal';

/**
 * Hook to require authentication before performing an action
 * Returns a function that wraps your action and shows auth modal if not authenticated
 */
export function useRequireAuth() {
  const { user, isLoading } = useAuth();
  const { openSignIn } = useAuthModal();

  /**
   * Wraps an action that requires authentication
   * If user is not authenticated, shows the auth modal instead
   * @param action The action to perform if authenticated
   * @param options Optional configuration
   */
  const requireAuth = async <T,>(
    action: () => T | Promise<T>,
    options?: { 
      onUnauthenticated?: () => void;
      message?: string;
    }
  ): Promise<T | null> => {
    if (isLoading) {
      console.log('Authentication check in progress...');
      return null;
    }

    if (!user) {
      console.log(options?.message || 'Authentication required for this action');
      if (options?.onUnauthenticated) {
        options.onUnauthenticated();
      }
      openSignIn();
      return null;
    }

    return await action();
  };

  return { requireAuth, isAuthenticated: !!user && !isLoading };
}
