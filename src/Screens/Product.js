import React, { Component } from 'react'
import { View, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native'
import ListProduct from '../Components/ListProduct'
import { connect } from 'react-redux'
import { getAllProduct } from '../Publics/Redux/actions/product'
import { getAllCategory } from '../Publics/Redux/actions/category'
import AsyncStorage from '@react-native-community/async-storage';

class Product extends Component {
  state = {
    product: [],
    category: []
  }


  getProduct = async () => {
    await this.props.dispatch(getAllProduct());
    const product = this.props.product.productData
    this.setState({
      product: product
    })
  }

  getCategory = async () => {
    await this.props.dispatch(getAllCategory());
    const category = this.props.category.categoryData
    this.setState({
      category
    })
  }

  getToken = async () => {
    await AsyncStorage.getItem('Token', (err, token) => {
      this.setState({
        tokenData: token
      })
      console.log('ini token', token)
    })
  }
  componentDidMount() {
    this.getToken()
    this.getProduct()
    this.getCategory()
  }

  render() {
    return (

      <View style={{ backgroundColor: 'white', marginBottom: 60 }}>
        <View style={{ alignItems: 'center', paddingVertical: 10, backgroundColor: 'white', paddingHorizontal: 16, flexDirection: 'row' }}>
          <TextInput placeholder="I want to search..." style={{ flex: 1, backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: "#ddd", paddingVertical: 5, paddingHorizontal: 20 }} />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('InputProduct', { data: this.state.category })}>
            <Text style={{ marginHorizontal: 20 }}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ backgroundColor: '#FFF' }}>
          {
            this.state.product ?
              this.state.product.map(data => {
                return (
                  <ListProduct key={data.id} data={data} />
                )
              }) : (
                <Text>Loading gaes...</Text>
              )
          }
        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = ({ product, category }) => {
  return {
    product, category
  }
}

export default connect(mapStateToProps)(Product)