import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {
  navigation?: any;
  item: any;
}
const Item = ({navigation, item}: Props) => {
  console.log('item!: ', item)
  return (
    <View style={styles.container}>
      <Text>{item.name}</Text>
      <Text>{item.color}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 0.4,
    borderColor: 'red'
  },
});
export default Item;
