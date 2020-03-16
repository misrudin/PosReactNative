import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
const urls = 'http://52.70.29.181:4001/api/v1/';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc';

class Acount extends Component {
  state = {
    username: '',
    id_user: '',
  };

  logout = () => {
    Alert.alert(
      'Sure ?',
      'Do you want to logout',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.handleLogout()},
      ],
      {cancelable: false},
    );
  };

  handleLogout = async () => {
    await AsyncStorage.removeItem('Token');
    await AsyncStorage.removeItem('id');
    this.props.navigation.navigate('Logout');
  };
  getToken = async () => {
    await AsyncStorage.getItem('id', (err, id) => {
      this.setState({
        id_user: id,
      });
    });
  };
  componentDidMount = async () => {
    await this.getToken();
    await this.getUsername();
  };

  getUsername = async () => {
    const id = this.state.id_user;
    await axios
      .get(urls + `auth/user/${id}`, {
        headers: {
          token: token,
        },
      })
      .then(res => {
        this.setState({
          username: res.data[0].username,
        });
      });
  };
  render() {
    return (
      <ScrollView
        style={{paddingHorizontal: 16, flex: 1, backgroundColor: '#3f026b'}}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 10}}>
          <Text style={{fontSize: 27, color: '#acacac'}}>My Acount</Text>
        </View>
        <View
          style={{
            borderColor: 'salmon',
            borderWidth: 2,
            borderRadius: 5,
            flex: 1,
            width: '100%',
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              marginVertical: 10,
            }}>
            Hello !
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: 'white',
              marginVertical: 10,
            }}>
            {this.state.username}
          </Text>
          {/* <Text style={{fontSize: 12, color: 'white', marginVertical: 5}}>
            My Role
          </Text> */}
        </View>
        <View
          style={{flex: 1, width: '100%', marginTop: 10, alignItems: 'center'}}>
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ChangePassword')}
            style={{
              backgroundColor: 'salmon',
              width: '50%',
              padding: 10,
              borderRadius: 8,
              marginTop: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Change Password
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => this.logout()}
            style={{
              backgroundColor: 'salmon',
              width: '50%',
              padding: 10,
              borderRadius: 8,
              marginTop: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default Acount;
