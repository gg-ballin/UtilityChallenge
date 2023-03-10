import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

interface Props {
  title: string;
  onPress: any;
  customStyle: Object;
  textColor?: string;
}
const Button = ({title, onPress, customStyle, textColor}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, customStyle]} onPress={onPress}>
      <Text style={{color: textColor, fontSize: 15}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
  },
});
export default Button;
