/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from './components/Button';
import Item from './components/Item';

const URL = 'https://ba6gijdps7.execute-api.us-east-1.amazonaws.com/racers';

interface RacerProps {
  name: string;
  length: number;
  color: string;
  weight: number;
  status: string;
}

interface DataListProps {
  racers: RacerProps;
}

function App(): JSX.Element {
  const [dataList, setData] = useState<DataListProps>();
  const [globalProgress, setGlobalProgress] = useState('not yet run');
  const [loading, setLoading] = useState(false);
  function generateRacerWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfRacerWinning = Math.random();
    return callback => {
      setTimeout(() => {
        callback(likelihoodOfRacerWinning);
      }, delay);
    };
  }
  const onPressStartRace = () => {
    setGlobalProgress('races in progress');
    const auxObjList = {...dataList};
    dataList?.racers.forEach((item, index) => {
      auxObjList.racers[index].status = 'in progress';
      generateRacerWinLikelihoodCalculator()((likelihood: any) => {
        console.log(likelihood);
        auxObjList.racers[index].likelihood = likelihood;
        auxObjList.racers[index].status = 'calculated';
        setData(auxObjList);
      });
      dataList?.racers.sort((a, b) => b.likelihood - a.likelihood);
      // dataList?.racers.map(item => {});
    });
  };
  const onPressFetchRacers = () => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log('error: ', err);
      });
  };

  return (
    <View style={styles.sectionContainer}>
      <SafeAreaView />
      <View style={styles.btnContainer}>
        {!dataList && (
          <Button title="Fetch racers" onPress={onPressFetchRacers} />
        )}
        {dataList && <Button title="Start race" onPress={onPressStartRace} />}
        <Text>{globalProgress}</Text>
      </View>
      <View style={styles.containerList}>
        {loading && !dataList ? (
          <ActivityIndicator />
        ) : (
          <View>
            <FlatList
              data={dataList?.racers}
              ListFooterComponent={
                <Button
                  title="Reset data"
                  onPress={() => {
                    setData(null);
                    setGlobalProgress('not yet run');
                  }}
                  customStyle={styles.reset}
                  textColor={'white'}
                />
              }
              renderItem={({item, index}: any) => (
                <Item item={item} index={index} />
              )}
            />
          </View>
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
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  containerList: {
    flex: 1,
    width: '100%',
  },
  reset: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'gray',
  },
});

export default App;
