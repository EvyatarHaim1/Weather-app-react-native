import React, {FC} from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {UserInfo} from '../components/UserInfo';
import {signOut} from '../store/actions/user';
import LoginForm from '../components/LoginForm';

const LoginScreen: FC = () => {
  const userEmail = useSelector((state: any) => state?.userModule?.userEmail);
  const weatherStatus = useSelector(
    (state: any) => state.weatherModule.weatherStatus,
  );

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <ScrollView style={styles.container}>
      {userEmail ? (
        <UserInfo
          userEmail={userEmail}
          weatherStatus={weatherStatus}
          onSignOut={handleSignOut}
        />
      ) : (
        <LoginForm />
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
