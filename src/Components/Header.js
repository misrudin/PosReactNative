import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';

const Header = props => {
  const {qty} = useSelector(state => state.cart);
  return (
    <>
      <View style={styles.container}>
        <Text style={{color: '#fff'}}>Header</Text>
        <Text>{qty}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#348AC7',
    paddingVertical: 10,
    shadowOffset: {width: 8, height: 9},
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 8,
  },
});

export default Header;
