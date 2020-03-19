import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {savetoken} from '../Publics/Redux/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Loading = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      const getToken = async () => {
        await AsyncStorage.getItem('Token', (err, token) => {
          dispatch(savetoken(token));
        });
      };
      getToken();
    }, 1500);
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
        <Icon
          name="comments"
          solid
          color="#fed6f6"
          size={90}
          style={styles.logoHayuu2}
        />
        <Icon
          name="comments"
          solid
          color="#ff971d"
          size={80}
          style={styles.logoHayuu}
        />
      </View>
      {show ? <Text style={styles.haeu}>Hayuu</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f6f7',
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
