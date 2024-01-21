import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import WeatherCard from '../components/WeatherCard';
import {useSelector} from 'react-redux';
import Chart from '../components/Chart';
import {days} from '../utils/days';

function ForecastScreen() {
  const forecast = useSelector((state: any) => state.weatherModule.forecast);
  const city = useSelector((state: any) => state.weatherModule.city);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Five-day Forecast</Text>
        <Text style={styles.status}>City: {city}</Text>
        <View style={styles.chartContainer}>
          <Chart forecast={forecast} />
        </View>
        <View style={styles.weatherCardContainer}>
          {forecast?.map((day: any) => (
            <WeatherCard
              key={day?.EpochDate}
              day={days[new Date(day?.Date).getDay()]}
              temperature={day?.Temperature.Maximum.Value}
              weatherStatus={day?.Day?.IconPhrase}
              status={day?.Day?.IconPhrase}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#01579b', // Navy blue color
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
    color: '#004d40', // Dark teal color
  },
  chartContainer: {
    maxWidth: '100%',
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  weatherCardContainer: {
    maxWidth: '100%',
    alignSelf: 'stretch',
  },
});

export default ForecastScreen;
