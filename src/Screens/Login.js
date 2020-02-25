import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
    state = {
        username: '',
        password: '',
        msg: '',
        token: '',
        show: false,
        tokenData: ''
    }

    saveToken = async (Token) => {
        try {
            const token = JSON.stringify(Token)
            await AsyncStorage.setItem('Token', token);
        } catch (error) {
            console.log(error.message);
        }
    };

    handleLogin = () => {
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post(`http://ec2-54-173-178-155.compute-1.amazonaws.com:4001/api/v1/auth/login`, data)
            .then((res) => {
                if (!res.data.token) {
                    this.setState({
                        msg: res.data.msg,
                        show: true
                    })
                } else {
                    this.saveToken(res.data.token)
                    this.props.navigation.navigate('Home')
                }
            })
    }



    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#085366' }}>
                <StatusBar
                    // barStyle="dark-content"
                    hidden={false}
                    backgroundColor="#085366"
                    translucent={false}
                    networkActivityIndicatorVisible={true}
                />
                <View style={{ flex: 1, backgroundColor: '#085366', justifyContent: 'center' }}>
                    <View style={{ height: 400, backgroundColor: '#085366' }}>
                        {/* <Text>nantinya gambar</Text> */}
                    </View>
                    {/* <View style={{ justifyContent: 'center', alignItems: "center" }} >
                        <Text style={{ fontSize: 30, fontWeight: "bold", color: 'grey' }}>Login</Text>
                    </View> */}
                    <View style={{ paddingHorizontal: 16 }}>
                        <TextInput onChangeText={(e) => this.setState({ username: e })} value={this.state.username} placeholder='Username...' style={styles.textInput} keyboardType='email-address' />
                        <TextInput onChangeText={(e) => this.setState({ password: e })} value={this.state.password} placeholder='Password...' style={styles.textInput} secureTextEntry={true} />
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: 16 }}>
                        <TouchableOpacity onPress={this.handleLogin} >
                            <View style={styles.btn}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Login</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 20, alignItems: "center" }} onPress={() => { this.props.navigation.navigate('Register') }} >
                            <Text style={{ color: '#F4A501', fontWeight: 'bold', fontSize: 16 }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#eee',
        paddingVertical: 10,
        borderWidth: 1,
        color: "grey",
        borderRadius: 4,
        marginTop: 10,
        paddingLeft: 40,
        paddingRight: 20,
        borderColor: '#222526'
    },
    btn: {
        backgroundColor: "#F4A501",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: 15
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }

})

export default Login
