# Authentication System - No Anonymous Sessions

## Overview

As of this update, GigAgent **no longer creates anonymous sessions**. This change prevents session bloat, reduces backend load, and eliminates issues with crawlers creating unnecessary sessions.

## Key Changes

### 1. **No Automatic Session Creation**
- Landing page and public pages can be viewed without authentication
- Users are **not** automatically given anonymous sessions when visiting the site
- Session is only created when users actively sign up or sign in

### 2. **Auth Modal System**
Instead of redirecting to dedicated `/signin` or `/signup` pages, we now use a modal-based authentication system:

- **Global Auth Modal**: Located at `src/components/auth/AuthModal.tsx`
- **State Management**: Uses Zustand via `src/hooks/useAuthModal.ts`
- **Provider**: Automatically included in root layout via `AuthModalProvider`

## How to Use

### Opening the Auth Modal

In any component, use the `useAuthModal` hook:

```tsx
import { useAuthModal } from '@/hooks/useAuthModal';

function MyComponent() {
  const { openSignIn, openSignUp } = useAuthModal();

  return (
    <div>
      <button onClick={openSignIn}>Sign In</button>
      <button onClick={openSignUp}>Sign Up</button>
    </div>
  );
}
```

### Protecting Operations That Require Authentication

Use the `useRequireAuth` hook to protect actions:

```tsx
import { useRequireAuth } from '@/hooks/useRequireAuth';

function CreateJobButton() {
  const { requireAuth, isAuthenticated } = useRequireAuth();

  const handleCreateJob = async () => {
    await requireAuth(async () => {
      // This code only runs if user is authenticated
      // If not authenticated, the auth modal opens automatically
      await createJob(jobData);
      console.log('Job created!');
    }, {
      message: 'Please sign in to create a job',
      onUnauthenticated: () => {
        // Optional: Show a toast or notification
        console.log('Authentication required');
      }
    });
  };

  return (
    <button onClick={handleCreateJob}>
      {isAuthenticated ? 'Create Job' : 'Sign in to Create Job'}
    </button>
  );
}
```

### Checking Authentication Manually

```tsx
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/hooks/useAuthModal';

function MyComponent() {
  const { user, isLoading } = useAuth();
  const { openSignIn } = useAuthModal();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <p>Please sign in to continue</p>
        <button onClick={openSignIn}>Sign In</button>
      </div>
    );
  }

  return <div>Welcome, {user.name}!</div>;
}
```

## Public vs Protected Pages

### Public Pages (No Authentication Required)
These pages can be browsed freely without signing in:
- `/` - Home/Landing page
- `/u/[username]` - Public user profiles
- `/projects` - Browse projects (read-only)
- `/jobs` - Browse job listings (read-only)

### Protected Operations
These actions require authentication and will show the auth modal if user is not signed in:
- Creating jobs or projects
- Applying to jobs
- Sending messages
- Editing profile
- Any database write operations

## Migration Notes

### For Developers

1. **Replace navigation redirects** with auth modal calls:
   ```tsx
   // Old way ❌
   router.push('/signin');
   
   // New way ✅
   const { openSignIn } = useAuthModal();
   openSignIn();
   ```

2. **Remove `ensureSession()` calls** from public pages:
   ```tsx
   // Old way ❌
   useEffect(() => {
     ensureSession();
   }, []);
   
   // New way ✅
   // Just remove it - public pages don't need sessions
   ```

3. **Protect CRUD operations** with authentication checks:
   ```tsx
   // Old way ❌
   async function createPost() {
     await databases.createDocument(...); // Might create anonymous session
   }
   
   // New way ✅
   const { requireAuth } = useRequireAuth();
   async function createPost() {
     await requireAuth(async () => {
       await databases.createDocument(...);
     });
   }
   ```

### Breaking Changes

- **Anonymous sessions are no longer created** - Code that relied on automatic session creation will need to be updated
- **`convertAnonymousSession()` removed** - Use regular `signUp()` instead
- **`createAnonymousSession()` removed** - No longer available
- **`ensureSession()` behavior changed** - Now returns `null` instead of creating anonymous session

## Fallback Routes

The dedicated `/signin` and `/signup` pages still exist for:
- Direct URL access (bookmarks, external links)
- SEO purposes
- Users who prefer full-page authentication

However, within the app, we encourage using the modal system for a better user experience.

## Benefits

1. **No Session Bloat**: Eliminates hundreds of unused anonymous sessions
2. **Better Analytics**: Easier to distinguish real users from crawlers
3. **Improved Performance**: Reduced backend load from session management
4. **Better UX**: No page navigation required for authentication
5. **Cleaner Data**: Dashboards show only actual authenticated users

## Questions?

For questions or issues, please refer to the main project documentation or create an issue in the repository.
