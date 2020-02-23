import React, { Component } from 'react'
import { View, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native'
import ListCart from '../Components/ListCart'

class Cart extends Component {
    state = {

    }

    render() {
        return (

            <View style={{ backgroundColor: 'white',flex:1 }}>
                <View style={{ alignItems: 'center', paddingVertical: 10, backgroundColor: 'white', paddingHorizontal: 16, flexDirection: 'row' }}>
                    <TextInput placeholder="I want to search..." style={{ flex:1, backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: "#ddd", paddingVertical: 5, paddingHorizontal: 20 }} />
                    <Text style={{marginLeft:20}}>Add</Text>
                </View>
                <ScrollView style={{ backgroundColor: '#FFF',flex:1 }}>
                    <ListCart />
                    <ListCart />
                    <ListCart />
                    <ListCart />
                    <ListCart />
                    <ListCart />
                </ScrollView>
                <View style={{ alignItems: 'center', paddingVertical: 10, backgroundColor: 'salmon', paddingHorizontal: 16, flexDirection: 'row' }}>
                    <Text style={{marginLeft:20}}>Checkout</Text>
                    <Text style={{marginLeft:20}}>Cancel</Text>
                </View>
            </View>
        )
    }
}

export default Cart