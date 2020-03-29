import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Content = props => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => props.press(props.data)}>
          <Image source={{uri: props.data.image}} style={styles.imageLeft} />
        </TouchableOpacity>
        <View style={styles.detail}>
          <Text style={styles.title}>{props.data.name}</Text>
          <Text style={styles.price}>Rp. {props.data.price}</Text>
          <Text style={styles.description}>{props.data.description}</Text>
          <View style={styles.footer}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity onPress={() => props.show(props.data)}>
                <Icon name="edit" size={15} color="rgb(214, 160, 13)" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.delete(props.data)}>
                <Icon
                  name="trash"
                  size={15}
                  color="rgb(128, 6, 57)"
                  style={{marginLeft: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '95%',
    marginBottom: 7,
    marginTop: 7,
    borderRadius: 10,
    shadowOffset: {width: 5, height: 5},
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    position: 'relative',
  },
  imageLeft: {
    width: 120,
    height: 120,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  detail: {
    marginLeft: 8,
    minWidth: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  description: {
    color: '#acacac',
  },
  price: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
export default Content;
