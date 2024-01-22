import {useEffect} from 'react';
import {setUser} from '../store/actions/user';
import {AuthProvider} from '../types/types';

export const useAuth = (provider: AuthProvider) => {
  useEffect(() => {
    const unsubscribe = provider.onAuthStateChanged(userEmail => {
      setUser(userEmail || '');
    });
    return unsubscribe;
  }, [provider]);
};
