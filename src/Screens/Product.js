import React, { Component } from 'react'
import { View, ScrollView, TextInput, TouchableOpacity,Text } from 'react-native'
import ListProduct from '../Components/ListProduct'

class Product extends Component {
  state = {

  }

  render() {
    return (

      <View style={{ backgroundColor: 'white', marginBottom: 60 }}>
        <View style={{ alignItems: 'center', paddingVertical: 10, backgroundColor: 'white', paddingHorizontal: 16,flexDirection:'row' }}>
        <TextInput placeholder="I want to search..." style={{ flex:1, backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: "#ddd", paddingVertical: 5, paddingHorizontal: 20 }} />
                    <Text style={{marginLeft:20}}>Add</Text>
        </View>
        <ScrollView style={{ backgroundColor: '#FFF' }}>
          <ListProduct />
          <ListProduct />
        </ScrollView>
      </View>
    )
  }
}

export default Product