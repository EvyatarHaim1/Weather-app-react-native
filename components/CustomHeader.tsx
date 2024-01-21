import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SearchBar from './Searchbar';

const CustomHeader = ({route, title}) => {
  const showSearchBar = ['Current Weather', 'Forecast'].includes(route.name);

  return (
    <View style={styles.container}>
      {showSearchBar && (
        <>
          <Text style={styles.header}>{title}</Text>
          <SearchBar />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CustomHeader;
