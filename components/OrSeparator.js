import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../constants/Color';

const OrSeparator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>OR</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 30
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: Color.tertiary_color,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: Color.tertiary_color,
  },
});

export default OrSeparator;
