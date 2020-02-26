import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
const urls = 'http://ec2-54-173-178-155.compute-1.amazonaws.com:4001/api/v1/';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc';

class ListCategory extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionleft}>
          <TouchableOpacity onPress={() => this.props.edit(this.props.data)}>
            <Text style={{color: '#3f026b', fontWeight: 'bold', fontSize: 16}}>
              {this.props.data.nama_category}
            </Text>
            <Text style={{color: '#acacac'}}>Click to Edit..</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionright}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => this.props.onDelete(this.props.data.id)}>
            <Icon name="trash" size={22} color="#c7040e" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
