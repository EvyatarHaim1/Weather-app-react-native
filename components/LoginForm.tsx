import React, {FC} from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';
import {validateEmail, validatePassword} from '../utils/InputValidations';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {LoginFormProps} from '../types/types';

export const LoginForm: FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  onSignInWithLink,
  onNavigateSignUp,
  onGoogleSignIn,
}) => {
  const isLoginDisabled = !validateEmail(email) || !validatePassword(password);

  return (
    <View style={styles.loginContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <View style={styles.buttons}>
        <Button title="Login" onPress={onLogin} disabled={isLoginDisabled} />
        <Button
          title="Sign in with link"
          onPress={() => onSignInWithLink(email)}
          disabled={!validateEmail(email)}
        />
        <Button title="Not registered yet?" onPress={onNavigateSignUp} />
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={onGoogleSignIn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  textInput: {
    borderWidth: 1,
    borderColor: '#757575',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  googleButton: {
    width: '100%',
    height: 48,
  },
});
