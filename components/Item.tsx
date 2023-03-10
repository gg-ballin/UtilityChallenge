import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {
  item: any;
}
const Item = ({item}: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{item.name}</Text>
        <Text>{item.color}</Text>
      </View>
      <View>
        <Text>{item.status}</Text>
        <Text>{item.likelihood}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 0.4,
    borderColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
export default Item;
