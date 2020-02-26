import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ListCategory = props => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionleft}>
        <TouchableOpacity onPress={() => props.edit(props.data)}>
          <Text style={{color: '#3f026b', fontWeight: 'bold', fontSize: 16}}>
            {props.data.nama_category}
          </Text>
          <Text style={{color: '#acacac'}}>
            80 item product in this category
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionright}>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => props.onDelete(props.data.id)}>
          <Icon name="trash" size={22} color="#c7040e" />
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
  },
});

export default ListCategory;
