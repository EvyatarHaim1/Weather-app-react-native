import React, {FC} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {animationToStatus} from '../utils/animationToStatus';
import {UserInfoProps} from '../types/types';

export const UserInfo: FC<UserInfoProps> = ({
  userEmail,
  weatherStatus,
  onSignOut,
}) => {
  return (
    <View style={styles.userContainer}>
      <Text style={styles.welcomeText}>Welcome, {userEmail}</Text>
      <Text style={styles.companyInfo}>
        At AquaPure, we are dedicated to providing innovative and sustainable
        water solutions. Our mission is to ensure access to clean water for
        communities around the world.
      </Text>
      <FastImage
        resizeMode="contain"
        style={styles.companyImage}
        source={animationToStatus(weatherStatus)}
      />
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={onSignOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: '#01579b',
  },
  companyInfo: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    color: '#004d40',
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
});
