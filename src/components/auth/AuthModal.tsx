'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Button,
  Divider,
  Tabs,
  Tab,
  Stack,
  Alert,
  Fade,
  IconButton,
} from '@/components/ui/MuiShim';
import {
  Close as CloseIcon,
  GitHub,
  Email,
  Link as LinkIcon,
  Google as GoogleIcon,
  Login,
import { useAuth } from '@/contexts/AuthContext';
import { signIn, signUp, createMagicURLToken } from '@/utils/api';
import { useRouter } from 'next/navigation';
import EmailOTPForm from '@/components/EmailOTPForm';
import { ThemeAwareTextField } from '@/components/auth/ThemeAwareTextField';
import { ConnectWallet } from '@/components/ConnectWallet';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export default function AuthModal({ open, onClose, defaultTab = 'signin' }: AuthModalProps) {
  const router = useRouter();
  const { initiateGitHubLogin, initiateGoogleLogin, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(defaultTab);
  const [authMethod, setAuthMethod] = useState<'email' | 'otp' | 'magic'>('email');
  const [showWalletConnect, setShowWalletConnect] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  // Magic Link Email
  const [magicLinkEmail, setMagicLinkEmail] = useState('');

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await signIn(signInData.email, signInData.password);
      if (response) {
        await refreshUser();
        setSuccess('Signed in successfully!');
        setTimeout(() => {
          onClose();
          router.push('/home');
        }, 1000);
      } else {
        setError('Sign in failed. Please check your credentials.');
      }
    } catch (error) {
      setError(`Failed to sign in. ${error instanceof Error ? error.message : ''}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (signUpData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    if (!signUpData.username.trim()) {
      setError("Username is required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await signUp(signUpData.email, signUpData.password, signUpData.name);
      if (response) {
        await refreshUser();
        setSuccess('Account created successfully!');
        setTimeout(() => {
          onClose();
          router.push('/home');
        }, 1000);
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      setError(`Failed to create account. ${error instanceof Error ? error.message : 'Email may already be in use.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!magicLinkEmail || !/^\S+@\S+\.\S+$/.test(magicLinkEmail)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      await createMagicURLToken(magicLinkEmail);
      setSuccess('Magic link sent! Check your email to sign in.');
    } catch (error) {
      setError(`Failed to send magic link. ${error instanceof Error ? error.message : ''}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubAuth = () => {
    initiateGitHubLogin();
  };

  const handleGoogleAuth = () => {
    initiateGoogleLogin();
  };

  const handleClose = () => {
    setError(null);
    setSuccess(null);
    onClose();
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
            {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          {error && (
            <Fade in={!!error}>
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                {error}
              </Alert>
            </Fade>
          )}
          
          {success && (
            <Fade in={!!success}>
              <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
                {success}
              </Alert>
            </Fade>
          )}

          {/* Tab Switcher */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} variant="fullWidth">
              <Tab label="Sign In" value="signin" />
              <Tab label="Sign Up" value="signup" />
            </Tabs>
          </Box>

          {/* OAuth Buttons */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
              Continue with
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<GitHub />}
                onClick={handleGitHubAuth}
                fullWidth
                disabled={isLoading}
              >
                GitHub
              </Button>
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleAuth}
                fullWidth
                disabled={isLoading}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowWalletConnect(true)}
                fullWidth
                disabled={isLoading}
              >
                Wallet
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          {/* Auth Method Tabs */}
          <Tabs 
            value={authMethod} 
            onChange={(_, value) => setAuthMethod(value)}
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab label="Email" value="email" icon={<Email fontSize="small" />} iconPosition="start" />
            <Tab label="Magic Link" value="magic" icon={<LinkIcon fontSize="small" />} iconPosition="start" />
            <Tab label="OTP" value="otp" icon={<Login fontSize="small" />} iconPosition="start" />
          </Tabs>

          {/* Sign In Forms */}
          {activeTab === 'signin' && (
            <>
              {authMethod === 'email' && (
                <form onSubmit={handleSignIn}>
                  <ThemeAwareTextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={signInData.email}
                    onChange={handleSignInChange}
                    required
                  />
                  <ThemeAwareTextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={signInData.password}
                    onChange={handleSignInChange}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3 }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              )}

              {authMethod === 'magic' && (
                <form onSubmit={handleMagicLink}>
                  <ThemeAwareTextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={magicLinkEmail}
                    onChange={(e) => setMagicLinkEmail(e.target.value)}
                    required
                    helperText="We'll send a sign-in link to this email"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3 }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Magic Link'}
                  </Button>
                </form>
              )}

              {authMethod === 'otp' && (
                <Box>
                  <EmailOTPForm redirectPath="/home" />
                </Box>
              )}
            </>
          )}

          {/* Sign Up Forms */}
          {activeTab === 'signup' && (
            <>
              {authMethod === 'email' && (
                <form onSubmit={handleSignUp}>
                  <ThemeAwareTextField
                    label="Full Name"
                    name="name"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={signUpData.name}
                    onChange={handleSignUpChange}
                    required
                  />
                  <ThemeAwareTextField
                    label="Username"
                    name="username"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={signUpData.username}
                    onChange={handleSignUpChange}
                    required
                  />
                  <ThemeAwareTextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    required
                  />
                  <ThemeAwareTextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    required
                  />
                  <ThemeAwareTextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3 }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              )}

              {authMethod === 'magic' && (
                <form onSubmit={handleMagicLink}>
                  <ThemeAwareTextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={magicLinkEmail}
                    onChange={(e) => setMagicLinkEmail(e.target.value)}
                    required
                    helperText="We'll send a sign-up link to this email"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3 }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Magic Link'}
                  </Button>
                </form>
              )}

              {authMethod === 'otp' && (
                <Box>
                  <EmailOTPForm redirectPath="/home" />
                </Box>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Wallet Connect Modal */}
      {showWalletConnect && (
        <Dialog
          open={showWalletConnect}
          onClose={() => setShowWalletConnect(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Connect Wallet</Typography>
            <IconButton onClick={() => setShowWalletConnect(false)} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <ConnectWallet />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
