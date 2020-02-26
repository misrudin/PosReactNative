import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
} from 'react-native';
import Content from '../Components/Content';
import Hot from '../Components/Hot';
import {connect} from 'react-redux';
import {pagination, deleteProduct} from '../Publics/Redux/actions/product';
import {
  getAllCart,
  addProductToCart,
  getQty,
} from '../Publics/Redux/actions/cart';
import {getAllCategory} from '../Publics/Redux/actions/category';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      cartData: [],
      tokenData: '',
      loading: false,
      page: 1,
      keyword: '',
      categoryKey: '',
      dataAfterFilter: [],
      cart: {
        id_user: '',
        qty: 1,
        id_product: '',
      },
      scrool: false,
      show: false,
      qty: 0,
      total: 0,
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
      product: this.state.product.concat(this.props.product.productData[2]),
    });
    this.morepage();
  };
  getProductPage = async () => {
    const page = this.state.page;
    const category = this.state.categoryKey;
    const keyword = this.state.keyword;
    await this.props.dispatch(pagination(page, category, keyword));
    this.setState({
      product: this.props.product.productData[2],
    });
    this.morepage();
  };
  search = async () => {
    const page = this.state.page;
    const category = this.state.categoryKey;
    const keyword = this.state.keyword;
    await this.props.dispatch(pagination(page, category, keyword));
    this.morepage();
    this.setState({
      product: this.props.product.productData[2],
    });
  };

  sendQty = () => {
    const cart = this.props.cart.cartData;
    const newQty = [];
    cart.forEach(e => {
      newQty.push(e.qty);
    });
    this.setState({
      qty: newQty.reduce((a, b) => a + b, 0),
    });

    this.props.dispatch(getQty(this.state.qty));
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

  start = async () => {
    await this.getProduct();
    await this.props.dispatch(getAllCategory());
    await this.props.dispatch(getAllCart());
    this.setState({
      cartData: this.props.cart.cartData,
    });
    await this.sendQty();
    this.morepage();
  };
  componentDidMount() {
    this.start();
  }

  _onRefresh = async () => {
    this.setState({refreshing: true});
    await this.props.dispatch(getAllCart());
    await this.sendQty();
    await this.getProductPage();
    this.setState({refreshing: false});
  };

  addToCart = product => {
    if (product.stok > 0) {
      const newCart = {...this.state.cart};
      newCart.id_product = product.id;
      newCart.id_user = 10;
      this.setState(
        {
          cart: newCart,
        },
        async () => {
          const data = this.state.cart;
          await this.props.dispatch(addProductToCart(data));
          await this.sendQty();
        },
      );
    }
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

  handleDelete = id => {
    Alert.alert(
      'Sure?',
      'Do you want to delete this item',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteOk(id)},
      ],
      {cancelable: false},
    );
  };

  deleteOk = async id => {
    await this.props.dispatch(deleteProduct(id)).then(() => {
      this.getProductPage();
    });
  };

  showData = data => {
    this.props.navigation.navigate('EditProduct', {data: data});
  };

  render() {
    const qty = this.props.cart.qty;
    return (
      <View style={styles.container}>
        <StatusBar
          // barStyle="dark-content"
          hidden={false}
          backgroundColor="#3f026b"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <View
          style={{
            position: 'relative',
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: '#3f026b',
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, position: 'relative'}}>
            <TextInput
              placeholder="I want to search ..."
              style={styles.search}
              onChangeText={key => this.onSearch(key)}
              value={this.state.key}
            />
            <Icon
              name="search"
              size={20}
              color="#3f026b"
              style={{position: 'absolute', top: 10, left: 10}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginHorizontal: 11,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Cart')}
              style={{flexDirection: 'row'}}>
              <Icon name="shopping-cart" size={20} color="#F4A501" />
              <Text
                style={{fontWeight: 'bold', fontSize: 14, color: '#F4A501'}}>
                ({qty})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* content */}
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.state.scrool
              ? this.scrollView.scrollToEnd({animated: true})
              : null;
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={styles.content}>
            {/* Hot featured */}
            {/* <View style={{ backgroundColor: '#ddd', paddingVertical: 10, flex: 1 }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: '100%', borderRadius: 5, flexDirection: 'row', paddingLeft: 16 }}>
                                <Hot />
                                <Hot />
                                <Hot />
                                <Hot />
                                <Hot />
                                <Hot />
                                <Hot />
                                <Hot />
                                <Hot />
                            </ScrollView>
                        </View> */}

            {/* Second Featured */}

            <View
              style={{
                paddingHorizontal: 10,
                flex: 1,
                backgroundColor: '#fff',
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingTop: 10,
              }}>
              {!this.props.product.isPending ? (
                this.state.product.map(data => {
                  return (
                    <Content
                      key={data.id}
                      data={data}
                      onPress={this.addToCart}
                      onDelete={this.handleDelete}
                      edit={this.showData}
                    />
                  );
                })
              ) : (
                <View
                  style={{flex: 1, backgroundColor: '#fff', marginTop: '50%'}}>
                  <ActivityIndicator size="large" color="#ff33ff" />
                </View>
              )}
            </View>
          </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
  search: {
    backgroundColor: '#eee',
    paddingLeft: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingRight: 20,
    color: 'grey',
    fontSize: 14,
    paddingVertical: 5,
  },
});

const MapStateToProps = ({product, cart, category, auth, history}) => {
  return {
    product,
    cart,
    category,
    auth,
    history,
  };
};

export default connect(MapStateToProps)(Home);
