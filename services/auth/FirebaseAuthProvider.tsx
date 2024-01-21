import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {IAuthProvider} from '../../types/types'; // Ensure this is the correct path

GoogleSignin.configure({
  webClientId:
    '234076008858-tioa0nv8o1ed8k5fma1jgr0at776nq49.apps.googleusercontent.com',
});

export const FirebaseAuthProvider: IAuthProvider = {
  signInWithEmail: async (
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> => {
    return auth().signInWithEmailAndPassword(email, password);
  },

  signUpWithEmail: async (
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> => {
    return auth().createUserWithEmailAndPassword(email, password);
  },

  signInWithGoogle: async (): Promise<FirebaseAuthTypes.UserCredential> => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      if (!idToken)
        throw new Error('Google Sign-In failed: No ID token returned');
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  },

  signOut: async (): Promise<void> => {
    await auth().signOut();
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.signOut();
    }
  },

  sendSignInLinkToEmail: async (email: string): Promise<void> => {
    const actionCodeSettings = {
      url: 'https://evyatar-weatherapp-reactnative.firebaseapp.com/finishSignUp?cartId=1234',
      handleCodeInApp: true,
    };
    await auth().sendSignInLinkToEmail(email, actionCodeSettings);
  },

  onAuthStateChanged: (
    onUserChanged: (userEmail: string | null) => void,
  ): (() => void) => {
    return auth().onAuthStateChanged(firebaseUser => {
      onUserChanged(firebaseUser ? firebaseUser.email : null);
    });
  },
};
