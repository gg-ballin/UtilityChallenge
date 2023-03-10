/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import Button from './components/Button';
import Item from './components/Item';

const URL = 'https://ba6gijdps7.execute-api.us-east-1.amazonaws.com/racers';

function App(): JSX.Element {
  const [dataList, setData] = useState();

  function generateRacerWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfRacerWinning = Math.random();
    // debugger;
    return callback => {
      setTimeout(() => {
        callback(likelihoodOfRacerWinning);
      }, delay);
    };
  }
  const onPressStartRace = () => {
    const newList = {...dataList};
    newList?.racers.map((item, index) => {
      const auxList = {...dataList};
      auxList.racers[index].status = 'in progress';
      setData(auxList);
      generateRacerWinLikelihoodCalculator();
      auxList.racers[index].status = 'calculated';
      setData(auxList);
      console.log('dataList: ', dataList);
    });
  };
  const onPressFetchRacers = () => {
    fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        json.racers.map(obj => {
          obj['status'] = 'not yet run';
          obj['likelihood'] = 0;
        });
        setData(json);
      })
      .catch(err => console.log('error: ', err));
  };

  return (
    <View style={styles.sectionContainer}>
      <SafeAreaView />
      <View style={styles.btnContainer}>
        {!dataList && (
          <Button title="Fetch racers" onPress={onPressFetchRacers} />
        )}
        {dataList && <Button title="Start race" onPress={onPressStartRace} />}
      </View>
      <View style={{flex: 1, width: '100%'}}>
        <FlatList
          data={dataList?.racers}
          renderItem={({item, key}: any) => <Item item={item} />}
        />
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
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 10,
  },
});

export default App;
