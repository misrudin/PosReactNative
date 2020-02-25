import React, { Component } from 'react'
import { View, ScrollView, TextInput, TouchableOpacity, Text, ActivityIndicator, RefreshControl, StatusBar, Image } from 'react-native'
import ListProduct from '../Components/ListProduct'
import { connect } from 'react-redux'
// import AsyncStorage from '@react-native-community/async-storage';
import { deleteProduct, pagination } from '../Publics/Redux/actions/product'
import _ from 'lodash';

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      category: [],
      loading: false,
      keyword: '',
      scrool: false,
      page: 1,
      categoryKey: '',
      refreshing: false
    }
    this.search = _.debounce(this.search, 1000)
  }

  getProduct = async () => {
    const page = this.state.page;
    const category = this.state.categoryKey;
    const keyword = this.state.keyword;
    await this.props.dispatch(pagination(page, category, keyword));
    this.setState({
      product: this.state.product.concat(this.props.product.productData[2])
    });
  }
  search = async () => {
    const page = this.state.page;
    const category = this.state.categoryKey;
    const keyword = this.state.keyword;
    await this.props.dispatch(pagination(page, category, keyword));
    this.setState({
      product: this.props.product.productData[2]
    });
  }

  handleDelete = (id) => {
    this.props.dispatch(deleteProduct(id))
    alert('oke')
  }

  showData = (data) => {
    let product = data
    this.props.navigation.navigate('EditProduct', { dataProduct: product })
  }

  onSearch = (key) => {
    this.setState({
      keyword: key,
      page: 1,
      scrool: false
    }, () => {
      this.search()
    })
  }

  nextpage = () => {
    this.setState({
      page: this.state.page + 1,
      scrool: true
    }, () => {
      this.getProduct()
    })
  }

  getCategory = async () => {
    const category = this.props.category.categoryData
    this.setState({
      category
    })
  }

  // getToken = async () => {
  //   await AsyncStorage.getItem('Token', (err, token) => {
  //     this.setState({
  //       tokenData: token
  //     })
  //   })
  // }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.search()
    this.setState({ refreshing: false });
  }

  componentDidMount() {
    this.getProduct()
    this.getCategory()
  }

  render() {
    return (

      <View style={{ backgroundColor: 'white', marginBottom: 60 }}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#3f026b"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <View style={{ alignItems: 'center', paddingVertical: 10, backgroundColor: '#3f026b', paddingHorizontal: 16, flexDirection: 'row', position: 'relative' }}>
          <TextInput onChangeText={(key) => this.onSearch(key)} placeholder="I want to search..." style={{ flex: 1, backgroundColor: '#eee', borderRadius: 20, borderWidth: 1, borderColor: "#ddd", paddingVertical: 5, paddingHorizontal: 20, paddingLeft: 40 }} />
          <Image source={require('../Assets/img/search.png')} style={{ position: 'absolute', top: 22, left: 28 }} />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('InputProduct')}>
            <Text style={{ marginHorizontal: 20, fontWeight: "bold", fontSize: 14, color: '#F4A501' }}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.state.scrool ? this.scrollView.scrollToEnd({ animated: true }) : null
          }} style={{ backgroundColor: '#fff' }} refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          {
            !this.props.product.isPending ?
              this.state.product.map(data => {
                return (
                  <ListProduct key={data.id} data={data} onDelete={this.handleDelete} edit={this.showData} />
                )
              }) : (
                <View style={{ flex: 1, backgroundColor: '#eee', marginTop: '50%' }}>
                  <ActivityIndicator size="large" color="#ff33ff" />
                </View>
              )
          }
          <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center', margin: 10, borderRadius: 20, padding: 5, backgroundColor: '#fff' }} onPress={() => this.nextpage()}><Text>More</Text></TouchableOpacity>
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