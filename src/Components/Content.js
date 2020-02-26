import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Content = props => {
  return (
    <>
      <View
        style={{width: '50%', height: 250, padding: 6, position: 'relative'}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#eee',
            flex: 1,
            backgroundColor: '#eee',
            borderRadius: 6,
            overflow: 'hidden',
            position: 'relative',
            shadowColor: '#eee',
            shadowOffset: {width: 2, height: 2},
          }}>
          <TouchableOpacity onPress={() => props.onPress(props.data)}>
            <Image
              source={{uri: props.data.image}}
              style={{width: '100%', height: '100%', opacity: 1}}
            />
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: '#0a0317',
              }}>
              {props.data.name}
            </Text>
            <Text style={{fontSize: 14, color: '#3b3d3c'}}>
              Rp. {props.data.price}{' '}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <Icon name="edit" size={20} color="#F4A501" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.onDelete(props.data.id)}>
              <Icon
                name="trash"
                size={20}
                color="#c7040e"
                style={{marginLeft: 15, marginRight: 5}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Content;
