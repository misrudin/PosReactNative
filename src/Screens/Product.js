import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Image,
} from 'react-native';
import ListProduct from '../Components/ListProduct';
import {connect} from 'react-redux';
// import AsyncStorage from '@react-native-community/async-storage';
import {
  deleteProduct,
  pagination,
  addProduct,
  getAllProduct,
} from '../Publics/Redux/actions/product';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      category: [],
      loading: false,
      keyword: '',
      scrool: false,
      show: false,
      page: 1,
      categoryKey: '',
      refreshing: false,
    };
    this.search = _.debounce(this.search, 1000);
  }

  getProduct = async () => {
    const page = this.state.page;
    const category = this.state.categoryKey;
    const keyword = this.state.keyword;
    await this.props.dispatch(pagination(page, category, keyword));
    this.setState({
      product: this.state.product.productAll,
    });
  };
  search = async () => {
    await this.props.dispatch(getAllProduct());
    this.setState({
      product: this.state.product.productAll,
    });
  };

  handleDelete = id => {
    this.props.dispatch(deleteProduct(id));
    alert('oke');
  };

  showData = data => {
    let product = data;
    this.props.navigation.navigate('EditProduct', {dataProduct: product});
  };

  onSearch = key => {
    this.setState(
      {
        keyword: key,
        page: 1,
        scrool: false,
        show: false,
      },
      () => {
        this.search();
      },
    );
  };
  morepage = () => {
    if (!this.props.product.productData[2]) {
      this.setState({
        show: false,
      });
    } else if (this.state.page < this.props.product.productData[0]) {
      this.setState({
        show: true,
      });
    } else {
      this.setState({
        show: false,
      });
    }
  };
  nextpage = () => {
    if (this.state.page < this.props.product.productData[0]) {
      this.setState(
        {
          page: this.state.page + 1,
          scrool: true,
        },
        () => {
          this.getProduct();
        },
      );
    }
  };

  getCategory = async () => {
    const category = this.props.category.categoryData;
    this.setState({
      category,
    });
  };

  onSave = async fd => {
    await this.props.dispatch(addProduct(fd));
  };

  _onRefresh = async () => {
    this.setState({refreshing: true});
    await this.search();
    this.setState({refreshing: false});
  };

  componentDidMount() {
    this.getProduct();
    this.getCategory();
  }

  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#3f026b"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 10,
            backgroundColor: '#3f026b',
            paddingHorizontal: 16,
            flexDirection: 'row',
            position: 'relative',
          }}>
          <TextInput
            onChangeText={key => this.onSearch(key)}
            placeholder="I want to search..."
            style={{
              flex: 1,
              backgroundColor: '#eee',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#ddd',
              paddingVertical: 5,
              paddingHorizontal: 20,
              paddingLeft: 40,
            }}
          />
          <Icon
            name="search"
            size={20}
            color="#3f026b"
            style={{position: 'absolute', top: 20, left: 25}}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('InputProduct')}>
            <Icon
              name="plus-circle"
              size={25}
              color="#F4A501"
              style={{marginHorizontal: 20}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.state.scrool
              ? this.scrollView.scrollToEnd({animated: true})
              : null;
          }}
          style={{backgroundColor: '#fff'}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          {!this.props.product.isPending ? (
            this.state.product.map(data => {
              return (
                <ListProduct
                  key={data.id}
                  data={data}
                  onDelete={this.handleDelete}
                  edit={this.showData}
                  save={this.onSave}
                />
              );
            })
          ) : (
            <View style={{flex: 1, backgroundColor: '#FFF', marginTop: '50%'}}>
              <ActivityIndicator size="large" color="#ff33ff" />
            </View>
          )}
          {this.state.show ? (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                borderRadius: 20,
                padding: 5,
                backgroundColor: '#fff',
              }}
              onPress={() => this.nextpage()}>
              <Icon name="arrow-down" size={25} color="#F4A501" />
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({product, category}) => {
  return {
    product,
    category,
  };
};

export default connect(mapStateToProps)(Product);
