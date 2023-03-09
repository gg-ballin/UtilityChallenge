/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Item from './components/Item';

const URL = 'https://ba6gijdps7.execute-api.us-east-1.amazonaws.com/racers';

function App(): JSX.Element {
  const [dataList, setData] = useState(null);

  function generateRacerWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfRacerWinning = Math.random();

    return callback => {
      setTimeout(() => {
        callback(likelihoodOfRacerWinning);
      }, delay);
    };
  }
  const onPress = () => {
    fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.log('error: ', err));
  };
  return (
    <View style={styles.sectionContainer}>
      <SafeAreaView />
      <View style={{flex: 1, width: '100%'}}>
        <TouchableOpacity onPress={() => onPress()}>
          <Text>Start race!</Text>
        </TouchableOpacity>
        {dataList && (
          <FlatList
            data={dataList?.racers}
            renderItem={({item, key}: any) => <Item item={item} />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
