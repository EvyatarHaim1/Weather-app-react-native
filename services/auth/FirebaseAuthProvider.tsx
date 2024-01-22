import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {IAuthProvider} from '../../types/types'; // Ensure this is the correct path

// Configure Google Sign In
GoogleSignin.configure({
  webClientId:
    '234076008858-7h5864dklmhm7c4o2s1rvptuhg8sbv0u.apps.googleusercontent.com',
});

export const signInWithGoogle = async () => {
  try {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    throw new Error('Google Sign-In failed');
  }
};

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
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      if (!idToken)
        throw new Error('Google Sign-In failed: No ID token returned');

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
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
