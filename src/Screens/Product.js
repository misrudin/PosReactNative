import React, { Component } from 'react'
import { View, ScrollView, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import ListProduct from '../Components/ListProduct'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import { deleteProduct } from '../Publics/Redux/actions/product'

class Product extends Component {
  state = {
    product: [],
    category: [],
    loading: false,
    search: ''
  }

  onSearch = (key) => {
    this.setState({
      search: key,
      loading: true
    })
    setTimeout(() => {
      this.getProduct()
    }, 500)
  }

  handleDelete = (id) => {
    this.props.dispatch(deleteProduct(id))
    alert('oke')
  }

  showData = (data) => {
    let product = data
    this.props.navigation.navigate('EditProduct', { dataProduct: product })
  }

  getProduct = () => {
    const product = this.props.product.productData
    let dataAfterFilter = product.filter((product) => {
      return product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    })
    this.setState({
      product: dataAfterFilter,
      loading: false
    })
  }

  getCategory = async () => {
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
        <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, alignItems: 'center', paddingVertical: 10, backgroundColor: 'white', paddingHorizontal: 16, flexDirection: 'row' }}>
          <TextInput onChangeText={(key) => this.onSearch(key)} placeholder="I want to search..." style={{ flex: 1, backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: "#ddd", paddingVertical: 5, paddingHorizontal: 20 }} />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('InputProduct', { data: this.state.category })}>
            <Text style={{ marginHorizontal: 20 }}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ backgroundColor: '#eee' }}>
          {
            !this.props.product.isPending && !this.state.loading ?
              this.state.product.length < 1 ? (
                <View style={{ flex: 1, backgroundColor: '#eee', marginTop: '50%' }}>
                  <ActivityIndicator size="large" color="#ff33ff" />
                  <Text style={{ textAlign: 'center', color: '#999', marginTop: 10 }}>Result Not Found !</Text>
                </View>
              ) :
                this.state.product.map(data => {
                  return (
                    <ListProduct key={data.id} data={data} onDelete={this.handleDelete} edit={this.showData} />
                  )
                }) : (
                <View style={{ flex: 1, backgroundColor: '#eee', marginTop: '50%' }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
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