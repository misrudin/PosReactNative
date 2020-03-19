import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Header from '../Components/Header';
import {getAllCategory} from '../Publics/Redux/actions/category';
import {addProductToCart, getQty} from '../Publics/Redux/actions/cart';
import {pagination} from '../Publics/Redux/actions/product';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Hot} from '../Components/Hot';
import Content from '../Components/Content';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.auth.token,
      product: this.props.product.productData[2],
      page: 1,
      category: this.props.category.categoryData,
      cart: [],
      qty: 0,
      cart: {
        id_user: '',
        qty: 1,
        id_product: '',
      },
    };
    this.getProduct = _.debounce(this.getProduct, 1);
  }

  getProduct = () => {
    this.props
      .dispatch(pagination(this.state.page, this.state.token))
      .then(() => {
        this.setState({
          product: this.state.product.concat(this.props.product.productData[2]),
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
      const newCart = {...this.state.cart};
      newCart.id_product = product.id;
      newCart.id_user = 10;
      this.setState(
        {
          cart: newCart,
        },
        async () => {
          const data = this.state.cart;
          await this.props.dispatch(addProductToCart(data, this.state.token));
          await this.sendQty();
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

  render() {
    return (
      <>
        <Header />
        <View style={styles.hot}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.state.category}
            renderItem={({item}) => <Hot data={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.container}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.product}
            renderItem={({item}) => (
              <Content
                data={item}
                press={this.addToCart}
                show={this.showdata}
              />
            )}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            onEndReached={this.netxtpage}
            onEndReachedThreshold={0.5}
          />
          {this.props.product.isPending ? (
            <ActivityIndicator
              size="large"
              color="#285bd4"
              style={styles.loading}
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
  loading: {
    position: 'absolute',
    top: 0,
    bottom: '50%',
    left: 0,
    right: 0,
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
