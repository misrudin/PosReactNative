import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {editCategory} from '../Publics/Redux/actions/category';

import axios from 'axios';
const urls = 'http://52.70.29.181:4001/api/v1/';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc';

class EditCategory extends Component {
  state = {
    formCategory: {
      id: '',
      category: '',
    },
    loading: false,
  };

  handleChange = e => {
    let newData = {...this.state.formCategory};
    newData.category = e;
    this.setState({
      formCategory: newData,
    });
  };

  edit = () => {
    const data = this.state.formCategory;
    if (data.category) {
      this.setState({
        loading: true,
      });
      this.props.dispatch(editCategory(data)).then(() => {
        this.setState({
          loading: false,
        });
        Alert.alert('Congratulation', 'Edit Sucess!', [{text: 'OK'}]);
        this.clear();
        this.props.navigation.navigate('Category');
      });
    } else {
      Alert.alert('Warning', 'Please comlete input!', [{text: 'OK'}]);
    }
  };

  clear = () => {
    this.setState({
      formCategory: {
        id: '',
        category: '',
      },
    });
  };

  componentDidMount = () => {
    let newData = {...this.state.formCategory};
    newData.category = this.props.route.params.data.nama_category;
    newData.id = this.props.route.params.data.id;
    this.setState({
      formCategory: newData,
    });
  };

  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <View style={styles.sectionInput}>
            <Text style={{color: '#020', fontWeight: 'bold', marginBottom: 5}}>
              Category Name
            </Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={e => this.handleChange(e)}
              value={this.state.formCategory.category}
            />
          </View>

          <View style={styles.sectionBtn}>
            {this.state.loading ? (
              <ActivityIndicator size="large" color="#ff33ff" />
            ) : (
              <TouchableOpacity style={styles.styleBtn} onPress={this.edit}>
                <Text style={{color: 'white', fontSize: 16}}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fc',
    paddingHorizontal: 16,
  },
  sectionInput: {
    marginTop: 20,
    position: 'relative',
    paddingHorizontal: 20,
  },
  txtInput: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: '#999',
    fontSize: 16,
    marginTop: 4,
  },
  sectionBtn: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  styleBtn: {
    backgroundColor: '#3f026b',
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 15,
    margin: 10,
  },
});

const mapStateToProps = ({category}) => {
  return {
    category,
  };
};

export default connect(mapStateToProps)(EditCategory);
