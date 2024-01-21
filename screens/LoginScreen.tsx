import React, {FC, useState} from 'react';
import {View, Button, TextInput, Alert, ScrollView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {animationToStatus} from '../utils/animationToStatus';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {validateEmail, validatePassword} from '../utils/InputValidations';
import {
  signInWithEmail,
  signInWithGoogle,
  sendSignInLink,
  signOut,
} from '../store/actions/user';

const LoginScreen: FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const userEmail = useSelector((state: any) => state?.userModule?.userEmail);
  const weatherStatus = useSelector(
    (state: any) => state.weatherModule.weatherStatus,
  );

  const isLoginDisabled = !email || !password;

  const validateInput = () => {
    if (!validateEmail(email)) return 'Please enter a valid email.';
    if (!validatePassword(password))
      return 'Password must be at least 6 characters.';
    return '';
  };

  const handleSignInWithEmail = async () => {
    try {
      const errorMessage = validateInput();
      if (errorMessage) {
        Alert.alert('Login failed', errorMessage);
        return;
      }
      console.log(email, password);
      await signInWithEmail(email, password);
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Login failed', error.message);
    }
  };

  const handleSendSignInLink = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Input', 'Please enter a valid email.');
      return;
    }
    await sendSignInLink(email);
  };

  const handleSignOut = async () => {
    await signOut();
  };

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
            <Button title="Logout" onPress={handleSignOut} />
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
              onPress={handleSignInWithEmail}
              disabled={isLoginDisabled}
            />
            <Button
              title="Sign in with link"
              disabled={!email}
              onPress={handleSendSignInLink}
            />
            <Button
              title="Not registered yet?"
              onPress={() => navigation.navigate('SignUp')}
            />

            <GoogleSigninButton
              style={styles.googleButton}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={handleGoogleSignIn}
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
