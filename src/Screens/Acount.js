import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {savetoken} from '../Publics/Redux/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Acount = () => {
  const dispatch = useDispatch();
  const logout = () => {
    Alert.alert(
      'Sure',
      'Do you want to Signout ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            AsyncStorage.removeItem('Token').then(() => {
              dispatch(savetoken(null));
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          <Icon name="user" size={15} color="#fff" style={{marginRight: 10}} />
          <Text style={{fontWeight: 'bold', color: '#fff'}}>Username</Text>
        </View>
        <View style={styles.list}>
          <Icon name="key" size={15} color="#fff" style={{marginRight: 10}} />
          <Text style={{fontWeight: 'bold', color: '#fff'}}>Password</Text>
        </View>
        <View style={styles.list}>
          <Icon name="user" size={15} color="#fff" style={{marginRight: 10}} />
          <Text style={{fontWeight: 'bold', color: '#fff'}}>Role</Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <View style={[styles.list, {backgroundColor: 'rgb(128, 6, 57)'}]}>
            <Icon
              name="user"
              size={15}
              color="#fff"
              style={{marginRight: 10}}
            />
            <Text style={{fontWeight: 'bold', color: '#fff'}}>Signout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Acount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    backgroundColor: 'rgb(13, 134, 214)',
    paddingVertical: 15,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    flexDirection: 'row',
  },
});
