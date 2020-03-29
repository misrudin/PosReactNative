import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Alert,
} from 'react-native';
import {Header} from '../Components/Header';
import {getAllCategory} from '../Publics/Redux/actions/category';
import {
  addProductToCart,
  getQty,
  getAllCart,
} from '../Publics/Redux/actions/cart';
import {pagination, deleteProduct} from '../Publics/Redux/actions/product';
import {connect} from 'react-redux';
import _ from 'lodash';

import Content from '../Components/Content';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.auth.token,
      product: this.props.product.productData[2],
      page: 1,
      category: this.props.category.categoryData,
      qty: 0,
      formCart: {
        id_user: '',
        qty: 1,
        id_product: '',
      },
      key: '',
      error: false,
      loading: false,
    };
    this.getProduct = _.debounce(this.getProduct, 100);
  }

  getProduct = async () => {
    this.setState({loading: true});
    await this.props
      .dispatch(pagination(this.state.key, this.state.page, this.state.token))
      .then(() => {
        this.sendQty();
      })
      .then(() => {
        this.setState({
          product: this.state.product.concat(this.props.product.productData[2]),
          error: false,
          loading: false,
          key: '',
        });
      })
      .catch(err => {
        console.log(err.message);
        this.setState({
          error: true,
          product: [],
          loading: false,
          key: '',
        });
      });
  };

  netxtpage = async () => {
    if (this.state.page < this.props.product.productData[0]) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.getProduct();
        },
      );
    }
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.dispatch(getAllCart(this.state.token)).then(() => {
        this.sendQty();
      });
      this.props.dispatch(getAllCategory(this.state.token)).then(() => {
        this.setState({
          category: this.props.category.categoryData,
        });
      });

      this.setState(
        {
          page: 1,
          product: [],
        },
        () => {
          this.getProduct();
        },
      );
    });
  }

  addToCart = product => {
    if (product.stok > 0) {
      // alert(product.stok);
      const newCart = {...this.state.formCart};
      newCart.id_product = product.id;
      newCart.id_user = 10;
      this.setState(
        {
          formCart: newCart,
        },
        async () => {
          const data = this.state.formCart;
          await this.props
            .dispatch(addProductToCart(data, this.state.token))
            .then(() => {
              this.props.dispatch(getAllCart(this.state.token)).then(() => {
                this.sendQty();
              });
            });
        },
      );
    }
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

  showdata = data => {
    this.props.navigation.navigate('EditProduct', {data});
  };

  deletedata = data => {
    Alert.alert(
      'Sure ?',
      `Do you want to delete ${data.name} ?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.props
              .dispatch(deleteProduct(data.id, this.state.token))
              .then(() => {
                this.setState(
                  {
                    page: 1,
                    product: [],
                  },
                  () => {
                    this.getProduct();
                  },
                );
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  search = key => {
    // console.warn(key);

    this.setState(
      {
        key: key,
        page: 1,
        product: [],
      },
      () => {
        this.getProduct();
      },
    );
  };

  render() {
    // const {isRejected} = this.props.product;
    const {product, error, loading} = this.state;

    return (
      <>
        <Header
          onSearch={key => this.search(key)}
          onPress={() => this.props.navigation.navigate('Cart')}
        />
        <View style={styles.container}>
          {error ? (
            <Text style={styles.center}>
              Connection Error, Plaese try again !
            </Text>
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={product}
              renderItem={({item}) => (
                <Content
                  data={item}
                  press={this.addToCart}
                  show={this.showdata}
                  delete={data => this.deletedata(data)}
                />
              )}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={this.netxtpage}
              onEndReachedThreshold={0.5}
            />
          )}
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#ff33ff"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
          ) : null}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  hot: {
    width: '100%',
    backgroundColor: '#eee',
    paddingVertical: 10,
    shadowOffset: {width: 8, height: 9},
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 4,
  },
  center: {
    alignSelf: 'center',
    marginTop: 20,
    color: '#acacac',
  },
});

const mapStateToProps = ({product, auth, category, cart}) => {
  return {
    product,
    auth,
    category,
    cart,
  };
};

export default connect(mapStateToProps)(Home);
