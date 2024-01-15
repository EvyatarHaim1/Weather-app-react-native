import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();

  const isSignUpDisabled = !email || !password || !firstName || !lastName;

  const signUp = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      navigation.navigate('Forecast');

      Alert.alert('Success', 'Account created successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
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
