import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class ListCategory extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionleft}>
          <TouchableOpacity onPress={() => this.props.edit(this.props.data)}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#333'}}>
              {this.props.data.nama_category}
            </Text>
            {/* <Text style={{color: '#777'}}>20 item</Text> */}
            <Text style={{color: '#ddd'}}>Click to Edit..</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionright}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => this.props.onDelete(this.props.data)}>
            <Icon name="trash" size={15} color="rgb(128, 6, 57)" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    // backgroundColor: 'rgb(13, 134, 214)',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 4,
    width: '98%',
    alignSelf: 'center',

    shadowOffset: {width: 2, height: 1},
    shadowColor: '#000',
    shadowRadius: 1,
    shadowOpacity: 1,
    elevation: 2,
  },
  sectionleft: {
    flex: 1,
  },
});

export default ListCategory;
