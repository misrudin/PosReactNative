import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Header = props => {
  const [q, setKey] = useState('');
  const {qty, isPending} = useSelector(state => state.cart);

  const search = () => {
    // console.warn(q);
    props.onSearch(q);
  };

  const onChange = e => {
    setKey(e);
  };

  const clear = () => {
    setKey('');
    props.onSearch('');
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#fff',
            flexDirection: 'row',
            width: '80%',
          }}>
          <TextInput
            onChangeText={e => onChange(e)}
            onSubmitEditing={search}
            placeholder="I want to search..."
            value={q}
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#ddd',
              paddingVertical: 5,
              paddingHorizontal: 30,
            }}
          />
          <Icon
            name="search"
            size={15}
            color="#3a7bd5"
            style={{position: 'absolute', top: 12, left: 10}}
          />
          {q.length > 0 ? (
            <TouchableOpacity
              style={{position: 'absolute', right: 10, top: 1}}
              onPress={() => clear()}>
              <Text
                style={{
                  fontSize: 25,
                  color: '#999',
                }}>
                x
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {!isPending ? (
          <TouchableOpacity onPress={() => props.onPress()}>
            <Text
              style={{color: '#3a7bd5', fontWeight: 'bold', marginRight: 20}}>
              Cart({qty})
            </Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator
            size="small"
            color="#3a7bd5"
            style={{marginRight: 20}}
          />
        )}
      </View>
    </>
  );
};
export const HeaderCategory = props => {
  const [q, setKey] = useState('');
  const {qty} = useSelector(state => state.cart);

  const search = () => {
    props.onSearch(q);
  };

  const onChange = e => {
    setKey(e);
  };

  const clear = () => {
    setKey('');
    props.onSearch('');
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#fff',
            flexDirection: 'row',
            width: '80%',
          }}>
          <TextInput
            onChangeText={e => onChange(e)}
            onSubmitEditing={search}
            placeholder="I want to search..."
            value={q}
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#ddd',
              paddingVertical: 5,
              paddingHorizontal: 30,
            }}
          />
          <Icon
            name="search"
            size={15}
            color="#3a7bd5"
            style={{position: 'absolute', top: 12, left: 10}}
          />
          {q.length > 0 ? (
            <TouchableOpacity
              style={{position: 'absolute', right: 10, top: 1}}
              onPress={() => clear()}>
              <Text
                style={{
                  fontSize: 25,
                  color: '#999',
                }}>
                x
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity onPress={() => props.onPress()}>
          <Icon
            name="plus-circle"
            size={20}
            color="#3a7bd5"
            style={{marginRight: 20}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
export const HeaderHistory = props => {
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 40,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'rgb(13, 134, 214)', fontWeight: 'bold'}}>
              Logged In as
            </Text>
            <Text
              style={{
                backgroundColor: 'rgb(13, 134, 214)',
                borderRadius: 5,
                color: '#fff',
                paddingHorizontal: 5,
                marginLeft: 5,
                fontWeight: 'bold',
              }}>
              Udin
            </Text>
          </View>
          <TouchableOpacity onPress={() => props.onPress()}>
            <Icon name="user" size={25} color="rgb(13, 134, 214)" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
    shadowOffset: {width: 8, height: 9},
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
