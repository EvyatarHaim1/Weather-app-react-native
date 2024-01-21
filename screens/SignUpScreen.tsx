import React, {FC, useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {signUpWithEmail} from '../store/actions/user'; // Ensure this is correctly imported
import {validateEmail, validatePassword} from '../utils/InputValidations';
import {InputField} from '../types/types';

const SignUpScreen: FC = () => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigation = useNavigation();

  const handleInputChange = (key: string, value: string) => {
    setInputs({...inputs, [key]: value});
  };

  const isSignUpDisabled = Object.values(inputs).some(value => !value);

  const validateInput = () => {
    if (!inputs.firstName.trim()) return 'Please enter your first name.';
    if (!inputs.lastName.trim()) return 'Please enter your last name.';
    if (!validateEmail(inputs.email)) return 'Please enter a valid email.';
    if (!validatePassword(inputs.password))
      return 'Password must be at least 6 characters.';
    return '';
  };

  const signUp = async () => {
    const errorMessage = validateInput();
    if (errorMessage) {
      Alert.alert('Error', errorMessage);
      return;
    }

    try {
      await signUpWithEmail(inputs.email, inputs.password);
      await navigation.navigate('Forecast');
      Alert.alert('Success', 'Account created successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const inputFields: InputField[] = [
    {key: 'firstName', placeholder: 'First Name'},
    {key: 'lastName', placeholder: 'Last Name'},
    {key: 'email', placeholder: 'Email', keyboardType: 'email-address'},
    {key: 'password', placeholder: 'Password', secureTextEntry: true},
  ];

  return (
    <View style={styles.container}>
      {inputFields.map(({key, ...rest}) => (
        <TextInput
          key={key}
          style={styles.input}
          value={inputs[key]}
          onChangeText={value => handleInputChange(key, value)}
          {...rest}
        />
      ))}
      <Button title="Sign Up" onPress={signUp} disabled={isSignUpDisabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default SignUpScreen;
