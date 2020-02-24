import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

class Acount extends Component {
	state = {

	}

	handleLogout = () => {
		AsyncStorage.removeItem('Token')
		alert('logout')
		this.props.navigation.navigate('Login')
	}
	render() {
		return (

			<ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
				<View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
					<Text style={{ fontSize: 20, color: '#acacac' }}>My Acount</Text>
				</View>
				<View style={{ backgroundColor: 'salmon', flex: 1, width: '100%', marginTop: 10, alignItems: 'center' }}>
					<Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginVertical: 10 }}>God Morning !</Text>
					<Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', marginVertical: 10 }}>My USername</Text>
					<Text style={{ fontSize: 12, color: 'white', marginVertical: 5 }}>My Role</Text>
				</View>
				<View style={{ flex: 1, width: '100%', marginTop: 10, alignItems: 'center' }}>
					<TouchableOpacity style={{ backgroundColor: 'salmon', width: '50%', padding: 10, borderRadius: 8, marginTop: 20 }}>
						<Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>Change Profile</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.handleLogout()} style={{ backgroundColor: 'salmon', width: '50%', padding: 10, borderRadius: 8, marginTop: 20 }}>
						<Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
					</TouchableOpacity>
				</View>

			</ScrollView>
		)
	}
}

export default Acount