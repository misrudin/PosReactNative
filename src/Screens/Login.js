import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
  state = {
    username: '',
    password: '',
    msg: '',
    token: '',
    loading: false,
    tokenData: '',
  };

  saveToken = async data => {
    try {
      const token = data.token;
      const id = JSON.stringify(data.id);

      await AsyncStorage.setItem('Token', token);
      await AsyncStorage.setItem('id', id);
    } catch (error) {
      console.log(error.message);
    }
  };

  handleLogin = () => {
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    if (data.username && data.password) {
      this.setState({
        loading: true,
      });
      axios
        .post(`http://52.70.29.181:4001/api/v1/auth/login`, data)
        .then(res => {
          if (!res.data.token) {
            this.setState({
              msg: res.data.msg,
              loading: false,
            });
          } else {
            this.saveToken(res.data);
            this.setState({
              loading: false,
            });
            this.clear();
            this.props.navigation.navigate('Home');
          }
        });
    } else {
      this.setState({
        msg: 'Enter Username and Password !',
      });
    }
  };

  clear = () => {
    this.setState({
      username: '',
      password: '',
      msg: '',
    });
  };

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#085366'}}>
        <StatusBar
          // barStyle="dark-content"
          hidden={false}
          backgroundColor="#085366"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: '#085366',
            justifyContent: 'center',
          }}>
          <View style={{height: 300, backgroundColor: '#085366'}}>
            {/* <Text>nantinya gambar</Text> */}
          </View>
          {/* <View style={{ justifyContent: 'center', alignItems: "center" }} >
                        <Text style={{ fontSize: 30, fontWeight: "bold", color: 'grey' }}>Login</Text>
                    </View> */}
          <Text style={{textAlign: 'center', color: 'salmon', fontSize: 14}}>
            {this.state.msg}
          </Text>
          <View style={{paddingHorizontal: 16}}>
            <TextInput
              onChangeText={e => this.setState({username: e})}
              value={this.state.username}
              placeholder="Username..."
              style={styles.textInput}
              keyboardType="email-address"
            />
            <TextInput
              onChangeText={e => this.setState({password: e})}
              value={this.state.password}
              placeholder="Password..."
              style={styles.textInput}
              secureTextEntry={true}
            />
          </View>
          <View style={{marginTop: 20, marginHorizontal: 16}}>
            {this.state.loading ? (
              <ActivityIndicator size="large" color="#ff33ff" />
            ) : (
              <TouchableOpacity onPress={this.handleLogin}>
                <View style={styles.btn}>
                  <Text
                    style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{marginTop: 20, alignItems: 'center'}}
              onPress={() => {
                this.props.navigation.navigate('Register');
              }}>
              <Text
                style={{color: '#F4A501', fontWeight: 'bold', fontSize: 16}}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    borderWidth: 1,
    color: 'grey',
    borderRadius: 4,
    marginTop: 10,
    paddingLeft: 40,
    paddingRight: 20,
    borderColor: '#222526',
  },
  btn: {
    backgroundColor: '#F4A501',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Login;
