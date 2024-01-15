import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {animationToStatus} from '../utils/animationToStatus';
import FastImage from 'react-native-fast-image';

type WeatherCardProps = {
  day: string;
  temperature: number;
  status: string;
  weatherStatus?: string;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  day,
  temperature,
  weatherStatus,
  status,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.day}>{day}</Text>
      <FastImage
        resizeMode="contain"
        style={styles.image}
        source={animationToStatus(weatherStatus as string)}
      />
      <Text style={styles.temperature}>{temperature} °C</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white', // Background color
    padding: 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2}, // Shadow for iOS
    shadowOpacity: 0.25, // Shadow for iOS
    shadowRadius: 3.84, // Shadow for iOS
    elevation: 5, // Shadow for Android
    marginTop: 20,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 16,
    color: 'darkgreen', // A yellow color for temperature to stand out
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
});

export default WeatherCard;
