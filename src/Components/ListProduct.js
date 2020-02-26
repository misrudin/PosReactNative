import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ListProduct = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center'}}
        onPress={() => props.edit(props.data)}>
        <View style={styles.sectionleft}>
          <View>
            <Image style={styles.img} source={{uri: props.data.image}} />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Text style={{color: '#3f026b', fontWeight: 'bold', fontSize: 16}}>
              {props.data.name}
            </Text>
            <Text style={{color: '#acacac'}}>{props.data.description}</Text>
            <Text style={{color: '#acacac'}}>Rp. {props.data.price}</Text>
            <Text style={{color: '#acacac'}}>Stok : {props.data.stok}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.sectionright}>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => props.onDelete(props.data.id)}>
          <Icon name="trash" size={25} color="#c7040e" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#ddd',
  },
  sectionleft: {
    flex: 1,
    flexDirection: 'row',
  },
  img: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
  },
});

export default ListProduct;
