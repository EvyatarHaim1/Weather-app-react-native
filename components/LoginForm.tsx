import React, {FC, useState} from 'react';
import {View, Button, TextInput, Alert, StyleSheet} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {validateEmail, validatePassword} from '../utils/InputValidations';
import {
  signInWithEmail,
  signInWithGoogle,
  sendSignInLink,
} from '../store/actions/user';
import {useNavigation} from '@react-navigation/native';

const LoginForm: FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    console.log(email);
    if (!validateEmail(email)) {
      Alert.alert('Invalid Input', 'Please enter a valid email.');
      return;
    }
    await sendSignInLink(email);
  };

  return (
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
          onPress={handleSendSignInLink}
          disabled={!email}
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
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#757575',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
  buttons: {
    display: 'flex',
    gap: 10,
    marginTop: 10,
    width: '80%',
  },
  googleButton: {
    height: 48,
    width: '100%',
  },
  btn: {
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export default LoginForm;
