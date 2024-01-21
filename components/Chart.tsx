import React, {FC, useState} from 'react';
import {View, Dimensions, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {ChartProps} from '../types/types';

const Chart: FC<ChartProps> = ({forecast}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const convertFahrenheitToCelsius = (fahrenheit: number) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  const data = {
    labels: forecast.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        data: forecast.map(day =>
          convertFahrenheitToCelsius(day.Temperature.Maximum.Value),
        ),
        withDots: true,
      },
    ],
  };

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
    formatYLabel: value => `${value?.toFixed(2)}°C`, // Add °C to y-index values
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        onDataPointClick={({index}) => setActiveIndex(index)}
      />
      {activeIndex !== null && (
        <Text>
          Max Temp:{' '}
          {convertFahrenheitToCelsius(
            forecast[activeIndex].Temperature.Maximum.Value,
          )?.toFixed(2)}
          °C
        </Text>
      )}
    </View>
  );
};

export default Chart;
