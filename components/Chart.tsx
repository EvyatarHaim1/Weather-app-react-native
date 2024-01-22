import React, {FC, useState} from 'react';
import {View, Dimensions, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {ChartProps} from '../types/types';

const Chart: FC<ChartProps> = ({forecast}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const convertFahrenheitToCelsius = (fahrenheit: number) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  const safeConvertToFahrenheit = day => {
    if (day && day.Temperature && day.Temperature.Maximum) {
      return convertFahrenheitToCelsius(day.Temperature.Maximum.Value || 0);
    }
    return 0; // Default value if structure is not as expected
  };

  const isValidForecastData =
    forecast && Array.isArray(forecast) && forecast.length > 0;

  const data = isValidForecastData
    ? {
        labels: forecast.map((_, index) => `Day ${index + 1}`),
        datasets: [
          {
            data: forecast.map(day => safeConvertToFahrenheit(day)),
            withDots: true,
          },
        ],
      }
    : null;

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
    formatYLabel: value => `${parseFloat(value)?.toFixed(2)}°C`, // Add °C to y-axis values
  };

  return (
    <View style={styles.container}>
      {isValidForecastData && data && (
        <LineChart
          data={data}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chartStyle}
          onDataPointClick={({index}) => setActiveIndex(index)}
        />
      )}
      {activeIndex !== null && activeIndex < forecast.length && (
        <Text style={styles.temperatureText}>
          Max Temp: {safeConvertToFahrenheit(forecast[activeIndex])?.toFixed(2)}
          °C
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  temperatureText: {
    fontSize: 16,
    color: '#004d40',
    marginTop: 10,
  },
});

export default Chart;
