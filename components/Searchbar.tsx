import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import searchIcon from '../assets/searchIcon.png';

import {
  fetch_Location_Autocomplete,
  get_city_weather,
  get_fiveDays_forecast,
} from '../store/actions/weather';
import {useSelector} from 'react-redux';

export default function SearchBar() {
  const [city, setCity] = useState<string>('');
  const cities = useSelector((state: any) => state.weatherModule.cities);

  useEffect(() => {
    if (city) fetch_Location_Autocomplete(city);
  }, [city]);

  const chooseCity = async (city: any) => {
    setCity('');
    await get_city_weather(city?.LocalizedName);
    await get_fiveDays_forecast(city?.Key); // Use the correct city ID here
  };

  return (
    <>
      <View style={styles.div}>
        <Image source={searchIcon} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Select city"
          value={city}
          onChangeText={e => setCity(e)}
        />
      </View>
      {city && cities?.length >= 1 && (
        <View style={styles.list}>
          {cities?.map((city, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => chooseCity(city)}>
              <Text>{city?.LocalizedName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  div: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  input: {
    width: '85%',
    marginLeft: '2%',
  },
  list: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    textAlign: 'center',
    marginTop: 3,
    padding: 8,
  },
  option: {
    paddingVertical: 4,
  },
  optionTextLight: {
    backgroundColor: 'lightgray',
  },
  optionTextDark: {
    backgroundColor: '#505050',
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
});
