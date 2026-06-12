/**
 * Example component showing how to protect operations that require authentication
 * 
 * This is a reference implementation demonstrating best practices for:
 * 1. Using the useRequireAuth hook
 * 2. Showing appropriate UI based on auth state
 * 3. Gracefully handling authentication requirements
 */

'use client';

import React, { useState } from 'react';
;
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedActionExample() {
  const { requireAuth, isAuthenticated } = useRequireAuth();
  const { user } = useAuth();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Example: Creating a job posting (protected operation)
   */
  const handleCreateJob = async () => {
    setResult(null);
    setError(null);

    await requireAuth(async () => {
      try {
        // This code only runs if user is authenticated
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setResult('Job created successfully! (This is a demo)');
        console.log('Job created by user:', user?.$id);
      } catch (err) {
        setError('Failed to create job');
        console.error(err);
      }
    }, {
      message: 'Please sign in to create a job posting',
      onUnauthenticated: () => {
        console.log('User needs to authenticate before creating a job');
      }
    });
  };

  /**
   * Example: Applying to a job (protected operation)
   */
  const handleApplyToJob = async () => {
    setResult(null);
    setError(null);

    await requireAuth(async () => {
      try {
        // This code only runs if user is authenticated
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setResult('Application submitted! (This is a demo)');
        console.log('Application by user:', user?.$id);
      } catch (err) {
        setError('Failed to submit application');
        console.error(err);
      }
    }, {
      message: 'Please sign in to apply to this job'
    });
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Protected Actions Example
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          These actions require authentication. Click a button below to see how the system handles unauthenticated users.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleCreateJob}
            fullWidth
          >
            {isAuthenticated ? 'Create Job Posting' : 'Sign in to Create Job'}
          </Button>

          <Button 
            variant="outlined" 
            onClick={handleApplyToJob}
            fullWidth
          >
            {isAuthenticated ? 'Apply to Job' : 'Sign in to Apply'}
          </Button>
        </Box>

        {/* Status Messages */}
        {result && (
          <Alert severity="success" sx={{ mt: 3 }}>
            {result}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {/* Authentication Status */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Authentication Status:
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {isAuthenticated ? (
              <>✓ Authenticated as {user?.name || user?.email}</>
            ) : (
              <>⚠ Not authenticated - actions will show auth modal</>
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProtectedActionExample;
