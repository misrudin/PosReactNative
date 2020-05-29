import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {savetoken} from '../Publics/Redux/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';

const Loading = () => {
  // const [error, setError] = useState(false);
  const dispatch = useDispatch();

  // const getToken = async () => {
  //   await AsyncStorage.getItem('Token', (err, token) => {
  //     dispatch(savetoken(token));
  //   });
  // };

  // const openApp = () => {
  //   dispatch(getAllUser())
  //     .then(() => {
  //       setTimeout(() => {
  //         getToken();
  //       }, 100);
  //     })
  //     .catch(() => {
  //       setTimeout(() => {
  //         setError(true);
  //         ToastAndroid.show(
  //           'Opss, Connection To Server  Error !',
  //           ToastAndroid.SHORT,
  //         );
  //       }, 100);
  //     });
  // };
  useEffect(() => {
    setTimeout(() => {
      const getToken = async () => {
        await AsyncStorage.getItem('Token', (err, token) => {
          dispatch(savetoken(token));
        });
      };
      getToken();
    }, 500);
  }, []);
  return (
    <>
      {/* <TouchableOpacity
        style={{flex: 1}}
        onPress={() => {
          setError(false);
          openApp();
        }}
        activeOpacity={0.8}> */}
      <View style={styles.container}>
        <Text style={{color: 'salmon', fontWeight: 'bold', fontSize: 30}}>
          Hayuu Cafe
        </Text>
      </View>
      {/* {error ? (
          <View style={styles.error}>
            <Text style={{color: 'salmon', fontWeight: 'bold'}}>
              Please Check Your Connection And Try Again !
            </Text>
          </View>
        ) : null} */}
      {/* </TouchableOpacity> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  to: {
    color: '#333',
    marginBottom: 10,
  },
  haeu: {
    color: '#ff971d',
    fontSize: 40,
    fontWeight: 'bold',
  },
  logoHayuu2: {
    position: 'absolute',
  },
  error: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default Loading;
