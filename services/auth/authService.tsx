import {FirebaseAuthProvider} from './FirebaseAuthProvider';
import {IAuthProvider} from '../../types/types';

const authProvider: IAuthProvider = FirebaseAuthProvider;

const AuthService = {
  signInWithEmail: async (email: string, password: string): Promise<any> => {
    return authProvider.signInWithEmail(email, password);
  },

  signInWithGoogle: async (): Promise<any> => {
    return authProvider.signInWithGoogle();
  },

  sendSignInLinkToEmail: async (email: string): Promise<void> => {
    return authProvider.sendSignInLinkToEmail(email);
  },

  signUpWithEmail: async (email: string, password: string): Promise<any> => {
    return authProvider.signUpWithEmail(email, password);
  },

  signOut: async (): Promise<void> => {
    return authProvider.signOut();
  },
};

export default AuthService;
