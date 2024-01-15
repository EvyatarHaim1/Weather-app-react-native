import React, {useState} from 'react';
import {View, Dimensions, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

interface DayData {
  Temperature: {
    Maximum: {
      Value: number;
    };
  };
}

interface ChartProps {
  forecast: DayData[];
}

const Chart: React.FC<ChartProps> = ({forecast}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Function to convert Fahrenheit to Celsius
  const convertFahrenheitToCelsius = (fahrenheit: number) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  const data = {
    labels: forecast.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        data: forecast.map(day =>
          convertFahrenheitToCelsius(day.Temperature.Maximum.Value),
        ), // Convert to Celsius
        // Additional config for dots
        withDots: true,
      },
    ],
    // This is where you would define the logic to show tooltip
    // However, react-native-chart-kit does not support tooltips natively
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
    formatYLabel: value => `${value.toFixed(2)}°C`, // Add °C to y-index values
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
        // onTouch event to determine which dot is being touched
        // This feature is limited and might not work as expected
        onDataPointClick={({index}) => setActiveIndex(index)}
      />
      {activeIndex !== null && (
        <Text>
          {/* Display details of the day when a point is touched */}
          {/* Adapt this part to display the details you need */}
          Max Temp:{' '}
          {convertFahrenheitToCelsius(
            forecast[activeIndex].Temperature.Maximum.Value,
          ).toFixed(2)}
          °C {/* Display in Celsius with 2 decimal places */}
        </Text>
      )}
    </View>
  );
};

export default Chart;
