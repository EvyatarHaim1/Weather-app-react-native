import React, {useEffect, useState} from 'react';
import {View, Button, TextInput, Alert, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {setUser} from '../store/actions/user';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {animationToStatus} from '../utils/animationToStatus';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const userEmail = useSelector((state: any) => state?.userModule?.userEmail);
  const weatherStatus = useSelector(
    (state: any) => state.weatherModule.weatherStatus,
  );

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '234076008858-vfoimic8s86a85gn4uai00h2k7naqokt.apps.googleusercontent.com',
    });
  }, []);

  const navigation = useNavigation();

  const signInWithEmail = async () => {
    try {
      const loggedInUser = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      setUser(loggedInUser.user.email); // Assuming email is needed
      navigation.navigate('Forecast');
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };

  const signInWithLink = async (email: string) => {
    const actionCodeSettings = {
      // URL you want to redirect back to
      url: 'https://evyatar-weatherapp-reactnative.firebaseapp.com/finishSignUp?cartId=1234',
      handleCodeInApp: true,
    };

    try {
      await auth().sendSignInLinkToEmail(email, actionCodeSettings);
      // Save the email locally to use when the link is clicked
      console.log('Sign-in link sent to email:', email);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }
    } catch (error: any) {
      Alert.alert('Logout failed', error.message);
    }
  };

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const isLoginDisabled = !email || !password;

  return (
    <ScrollView style={styles.container}>
      {userEmail ? (
        <View style={styles.userContainer}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.welcomeText}> {userEmail}</Text>

          <Text style={styles.companyInfo}>
            At AquaPure, we are dedicated to providing innovative and
            sustainable water solutions. Our mission is to ensure access to
            clean water for communities around the world.
          </Text>

          <FastImage
            resizeMode="contain"
            style={styles.companyImage}
            source={animationToStatus(weatherStatus)}
          />

          <View style={styles.logoutButtonContainer}>
            <Button title="Logout" onPress={signOut} />
          </View>
        </View>
      ) : (
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <View style={styles.buttons}>
            <Button
              title="Login"
              onPress={signInWithEmail}
              disabled={isLoginDisabled}
            />
            <Button
              title="Sign in with link"
              disabled={!email}
              onPress={() => signInWithLink(email)}
            />
            <Button
              title="Not registered yet?"
              onPress={() => navigation.navigate('SignUp')}
            />

            <GoogleSigninButton
              style={styles.googleButton}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={onGoogleButtonPress}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  loginContainer: {
    marginTop: 100,
    flex: 1,
    display: 'flex',
    gap: 10,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    gap: 15,
  },
  userContainer: {
    width: '100%',
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#01579b', // Navy blue color
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#757575', // Gray color
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  spacer: {
    height: 20,
  },
  companyInfo: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    color: '#004d40', // Dark teal color
  },
  companyImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  logoutButtonContainer: {
    width: '80%',
  },
  googleButton: {
    width: '100%',
    height: 48,
  },
};

export default LoginScreen;
