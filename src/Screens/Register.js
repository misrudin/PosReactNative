import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import axios from 'axios'

class Register extends Component {
    state = {
        username: '',
        password: '',
        passwordRepeat: ''
    }

    handleRegister = () => {
        const { username, password, passwordRepeat } = this.state
        const data = {
            username,
            password,
            role: 2
        }
        if (password === passwordRepeat) {
            this.postUser(data)
        } else {
            alert('jangan gitu bos!')
        }
    }

    postUser = (data) => {
        axios.post(`http://ec2-54-173-178-155.compute-1.amazonaws.com:4001/api/v1/auth/register`, data)
            .then((res) => {
                if (!res.data.result) {
                    alert(res.data.msg)
                } else {
                    this.props.navigation.navigate('Login')
                }
            })
            .catch(err => console.log(err))
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
                        {/* <Text>nantinya gambar Juga</Text> */}
                    </View>
                    {/* <View style={{ justifyContent: 'center', alignItems: "center" }} >
                        <Text style={{ fontSize: 30, fontWeight: "bold", color: 'grey' }}>Register</Text>
                    </View> */}
                    <View style={{ paddingHorizontal: 16 }}>
                        <TextInput onChangeText={(e) => this.setState({ username: e })} value={this.state.username} placeholder='Username...' style={styles.textInput} />
                        <TextInput onChangeText={(e) => this.setState({ password: e })} value={this.state.password} placeholder='Password...' style={styles.textInput} />
                        <TextInput onChangeText={(e) => this.setState({ passwordRepeat: e })} value={this.state.passwordRepeat} placeholder='Repeat password...' style={styles.textInput} />
                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: 16 }}>
                        <TouchableOpacity onPress={this.handleRegister}>
                            <View style={styles.btn}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Register</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 20, alignItems: "center" }}>
                            <Text style={{ color: '#F4A501', fontWeight: 'bold', fontSize: 16 }} onPress={() => { this.props.navigation.navigate('Login') }}>Back To Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
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
    }
})

export default Register
