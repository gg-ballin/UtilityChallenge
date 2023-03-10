import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';

interface Props {
  item: any;
  index: number;
}
const Item = ({item, index}: Props) => {
  const toLowerCaseColor = item.color.toLowerCase();
  const handleBorderColor = status => {
    if (status === 'not yet run') {
      return 'black';
    } else if (status === 'in progress') {
      return 'blue';
    } else if (status === 'calculated') {
      return 'green';
    }
  };
  return (
    <View
      style={[styles.container, {borderColor: handleBorderColor(item.status)}]}>
      <View style={styles.containerTile}>
        <View>
          <Text>{index + 1}. </Text>
        </View>
        <View style={styles.containerTitle}>
          <View style={[styles.circle, {backgroundColor: toLowerCaseColor}]} />
          <Text>{item.name}</Text>
        </View>
      </View>
      <View style={styles.status}>
        {item.status === 'in progress' && <ActivityIndicator size="small" />}
        <Text style={styles.text}>{item.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
    margin: 5,
  },
  containerTile: {
    flexDirection: 'row',
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    marginRight: 10,
    marginLeft: 10,
  },
  status: {
    flexDirection: 'row',
  },
  text: {
    marginLeft: 15,
  }
});
export default Item;
