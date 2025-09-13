import { useEffect, useState } from 'react';
import liff from '@line/liff';
import { useAppStore } from '@/store/useAppStore';

interface LiffProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export function useLiff() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<LiffProfile | null>(null);
  const [isInLineApp, setIsInLineApp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const setAppProfile = useAppStore((state) => state.setProfile);
  const demoMode = useAppStore((state) => state.demoMode);

  useEffect(() => {
    if (demoMode) {
      // Demo mode - simulate logged in state
      const demoProfile = {
        userId: 'demo-user',
        displayName: 'Demo Adventurer',
        pictureUrl: 'https://picsum.photos/100/100?random=999',
        statusMessage: 'Exploring the magical world of DeFi!'
      };
      
      setIsInitialized(true);
      setIsLoggedIn(true);
      setProfile(demoProfile);
      setAppProfile(demoProfile);
      setIsInLineApp(true);
      return;
    }

    const initializeLiff = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID;
        
        if (!liffId) {
          throw new Error('LIFF ID not configured');
        }

        await liff.init({ liffId });
        setIsInitialized(true);
        setIsInLineApp(liff.isInClient());

        if (liff.isLoggedIn()) {
          setIsLoggedIn(true);
          const userProfile = await liff.getProfile();
          const profileData = {
            userId: userProfile.userId,
            displayName: userProfile.displayName,
            pictureUrl: userProfile.pictureUrl,
            statusMessage: userProfile.statusMessage,
          };
          setProfile(profileData);
          setAppProfile(profileData);
        }
      } catch (err) {
        console.error('LIFF initialization failed:', err);
        setError(err instanceof Error ? err.message : 'LIFF initialization failed');
      }
    };

    initializeLiff();
  }, [demoMode, setAppProfile]);

  const login = async () => {
    if (demoMode) return;
    
    try {
      if (!isInitialized) {
        throw new Error('LIFF not initialized');
      }
      
      liff.login();
    } catch (err) {
      console.error('Login failed:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const logout = async () => {
    if (demoMode) {
      setIsLoggedIn(false);
      setProfile(null);
      setAppProfile(null);
      return;
    }
    
    try {
      if (!isInitialized) {
        throw new Error('LIFF not initialized');
      }
      
      liff.logout();
      setIsLoggedIn(false);
      setProfile(null);
      setAppProfile(null);
    } catch (err) {
      console.error('Logout failed:', err);
      setError(err instanceof Error ? err.message : 'Logout failed');
    }
  };

  const shareTargetPicker = async (message: string) => {
    if (demoMode) {
      console.log('Demo: Would share message:', message);
      return;
    }

    try {
      if (!isInitialized || !isInLineApp) {
        throw new Error('Share target picker only available in LINE app');
      }

      await liff.shareTargetPicker([
        {
          type: 'text',
          text: message,
        },
      ]);
    } catch (err) {
      console.error('Share failed:', err);
      setError(err instanceof Error ? err.message : 'Share failed');
    }
  };

  const sendMessages = async (messages: any[]) => {
    if (demoMode) {
      console.log('Demo: Would send messages:', messages);
      return;
    }

    try {
      if (!isInitialized || !isInLineApp) {
        throw new Error('Send messages only available in LINE app');
      }

      await liff.sendMessages(messages);
    } catch (err) {
      console.error('Send messages failed:', err);
      setError(err instanceof Error ? err.message : 'Send messages failed');
    }
  };

  const closeWindow = () => {
    if (demoMode) return;
    
    if (isInitialized && isInLineApp) {
      liff.closeWindow();
    }
  };

  return {
    isInitialized,
    isLoggedIn,
    profile,
    isInLineApp,
    error,
    login,
    logout,
    shareTargetPicker,
    sendMessages,
    closeWindow,
  };
}