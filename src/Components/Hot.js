import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export const Hot = ({data}) => {
  return (
    <>
      <TouchableOpacity>
        <View
          style={{
            height: 40,
            backgroundColor: '#348AC7',
            margin: 2,
            borderRadius: 4,
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#fff'}}>{data.nama_category}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
export const All = ({name}) => {
  return (
    <>
      <TouchableOpacity>
        <View
          style={{
            height: 40,
            backgroundColor: '#348AC7',
            margin: 2,
            borderRadius: 4,
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#fff'}}>{name}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
