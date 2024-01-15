import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import {animationToStatus} from '../utils/animationToStatus';

function CurrentWeatherScreen() {
  const city = useSelector((state: any) => state.weatherModule.city);
  const userLocation = useSelector(state => state.userModule.userLocation);
  const temperature = useSelector(
    (state: any) => state.weatherModule.temperature,
  );
  const humidity = useSelector((state: any) => state.weatherModule.humidity);
  const weatherStatus = useSelector(
    (state: any) => state.weatherModule.weatherStatus,
  );
  const windSpeed = useSelector((state: any) => state.weatherModule.windSpeed);

  return (
    <View style={styles.container}>
      {userLocation && (
        <Text style={styles.location}>
          Your current location: Latitude {userLocation?.coords?.latitude},
          Longitude: {userLocation?.coords?.longitude}
        </Text>
      )}
      <ImageBackground
        resizeMode="cover"
        style={styles.imageBackground}
        source={animationToStatus(weatherStatus)}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{city}</Text>
          <Text style={styles.temperature}>Temperature: {temperature}°C</Text>
          <Text style={styles.weatherText}>Humidity: {humidity}%</Text>
          <Text style={styles.weatherText}>
            Weather Status: {weatherStatus}
          </Text>
          <Text style={styles.weatherText}>Wind Speed: {windSpeed} Knot</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // Semi-transparent white background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#01579b', // A navy blue color for the title
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#757575', // A gray color for location text
    marginBottom: 10,
  },
  temperature: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d40', // A darker shade of teal for text
    marginBottom: 10,
  },
  weatherText: {
    fontSize: 18,
    color: '#004d40', // A darker shade of teal for text
    marginBottom: 10,
  },
});

export default CurrentWeatherScreen;
