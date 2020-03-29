import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {savetoken} from '../Publics/Redux/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';

const Loading = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      const getToken = async () => {
        await AsyncStorage.getItem('Token', (err, token) => {
          dispatch(savetoken(token));
        });
      };
      getToken();
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Text>Lodaing</Text>
    </View>
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
});

export default Loading;
