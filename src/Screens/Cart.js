import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import ListCart from '../Components/ListCart';
import {connect} from 'react-redux';
import {
  getAllCart,
  checkOutAll,
  deleteAll,
  deleteCart,
  getDetail,
  getQty,
} from '../Publics/Redux/actions/cart';
import {getAllProduct} from '../Publics/Redux/actions/product';
import axios from 'axios';
import {Link} from '../Publics/env';
const urls = Link();
import Icon from 'react-native-vector-icons/FontAwesome5';

class Cart extends Component {
  state = {
    cart: [],
    formCheckOut: {
      faktur: '',
      id_user: '',
      qty: '',
      total: '',
    },
    qty: 0,
    total: this.props.cart.total,
    id_user: '10',
    show: false,
    token: this.props.auth.token,
    detailCart: [],
  };

  hide = async () => {
    this.setState({
      show: false,
    });
    this.props.navigation.navigate('Home');
  };

  getCart = async () => {
    await this.props.dispatch(getAllCart(this.state.token)).then(() => {
      this.setState({
        cart: this.props.cart.cartData,
      });
      this.sendQty();
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

  getDetailCart = async () => {
    const data = this.state.formCheckOut;
    await this.props.dispatch(getDetail(data.faktur, this.state.token));
    this.setState({
      detailCart: this.props.cart.cartDetail,
      show: true,
    });
  };

  okeCheckout = async () => {
    const data = this.state.formCheckOut;
    await this.props.dispatch(checkOutAll(data, this.state.token)).then(() => {
      this.getDetailCart();
    });
  };

  handleCheckout = () => {
    Alert.alert(
      'Checkout',
      'Click OK to continue transaction!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await this.props.dispatch(getAllCart(this.state.token)).then(() => {
              this.sendQty();
              const newCheckOut = {...this.state.formCheckOut};
              newCheckOut.faktur = new Date().getTime();
              newCheckOut.id_user = this.state.id_user;
              newCheckOut.qty = this.props.cart.qty;
              newCheckOut.total = this.state.total;
              this.setState(
                {
                  formCheckOut: newCheckOut,
                },
                () => {
                  this.okeCheckout();
                },
              );
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  deleteAll = () => {
    Alert.alert(
      'Cancel transaction',
      'All data will be deleted !',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteOk()},
      ],
      {cancelable: false},
    );
  };

  deleteOk = async () => {
    await this.props.dispatch(deleteAll(this.state.token));
    this.props.navigation.navigate('Home');
  };

  addQty = async data => {
    axios
      .patch(urls + `cart/add/${data.id}`, {
        headers: {
          token: this.state.token,
        },
      })
      .then(() => {
        this.setState({
          total: this.state.total + data.price,
        });
      });
  };
  minQty = async data => {
    axios
      .patch(urls + `cart/min/${data.id}`, {
        headers: {
          token: this.state.token,
        },
      })
      .then(() => {
        this.setState({
          total: this.state.total - data.price,
        });
      });
  };

  minDel = async (data, qty) => {
    await this.props
      .dispatch(deleteCart(data.id, this.state.token))
      .then(() => {
        if (qty !== undefined) {
          this.setState({
            cart: this.props.cart.cartData,
            total: this.state.total - data.price * qty,
          });
        } else {
          this.setState({
            cart: this.props.cart.cartData,
          });
        }
      });
  };

  componentDidMount() {
    this.getCart();
    this.props.dispatch(getAllProduct(this.state.token));
  }

  render() {
    return (
      <>
        <View style={{backgroundColor: 'white', flex: 1}}>
          <Modal
            animationType="slide"
            visible={this.state.show}
            onRequestClose={() => this.hide()}>
            <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 10}}>
              <View style={styles.list}>
                <Icon
                  name="user"
                  size={15}
                  color="#fff"
                  style={{marginRight: 10}}
                />
                <Text style={styles.text}>Udin</Text>
              </View>
              <View style={[styles.list, {marginTop: -10}]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    marginRight: 10,
                  }}>
                  #
                </Text>
                <Text style={styles.text}>
                  {this.state.formCheckOut.faktur}
                </Text>
              </View>
              <ScrollView
                style={{backgroundColor: '#fff'}}
                showsVerticalScrollIndicator={false}>
                {this.state.detailCart.map((data, i) => {
                  return <Item key={i} data={data} />;
                })}
              </ScrollView>
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                shadowOffset: {width: 2, height: 5},
                shadowColor: '#000',
                shadowRadius: 2,
                shadowOpacity: 1,
                elevation: 4,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{paddingHorizontal: 20}}>
                <Text style={{marginVertical: 2}}>
                  Ppn 10% : Rp. {(this.state.formCheckOut.total * 10) / 100}
                </Text>
                <Text style={{marginVertical: 2}}>
                  Total : Rp.{' '}
                  {(this.state.formCheckOut.total * 10) / 100 +
                    this.state.formCheckOut.total}
                </Text>
              </View>
              <View style={{flexDirection: 'row', paddingVertical: 10}}>
                <TouchableOpacity
                  onPress={this.hide}
                  style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16,
                      backgroundColor: 'rgb(13, 134, 214)',
                      borderRadius: 8,
                      padding: 10,
                      marginRight: 30,
                    }}>
                    Send Email
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.hide}
                  style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16,
                      backgroundColor: 'rgb(128, 6, 57)',
                      borderRadius: 8,
                      padding: 10,
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{paddingHorizontal: 20}}>
            {this.state.cart.length < 1 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 300,
                }}>
                <Icon
                  name="shopping-bag"
                  size={80}
                  color="rgb(128, 6, 57)"
                  style={{justifyContent: 'center'}}
                />
                <Text style={{color: 'rgb(128, 6, 57)', fontSize: 16}}>
                  Your cart is Empty!
                </Text>
                <Text style={{color: '#acacac', fontSize: 12}}>
                  Click image product to add
                </Text>
              </View>
            ) : (
              this.state.cart.map(data => {
                return (
                  <ListCart
                    key={data.id}
                    data={data}
                    add={this.addQty}
                    min={this.minQty}
                    minDel={this.minDel}
                  />
                );
              })
            )}
          </ScrollView>
        </View>
        {!this.state.cart.length < 1 ? (
          <>
            <View style={styles.containerFooter}>
              <View
                style={{
                  paddingVertical: 2,
                  flexDirection: 'row',
                }}>
                <Text>Total : Rp. {this.state.total} </Text>
                <Text style={{color: '#acacac', fontSize: 12}}>
                  *Belum termasuk ppn.
                </Text>
              </View>
              <View style={styles.foot}>
                <TouchableOpacity
                  style={styles.footer}
                  onPress={() => this.handleCheckout()}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16,
                      backgroundColor: 'rgb(13, 134, 214)',
                      borderRadius: 8,
                      padding: 10,
                    }}>
                    Checkout
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.footer}
                  onPress={() => this.deleteAll()}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16,
                      backgroundColor: 'rgb(128, 6, 57)',
                      borderRadius: 8,
                      padding: 10,
                    }}>
                    Cancel Transaction
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null}
        {this.props.cart.isPending ? (
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    marginHorizontal: 40,
  },
  foot: {
    alignItems: 'center',
    paddingVertical: 20,

    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerFooter: {
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOffset: {width: 2, height: 5},
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 4,
  },
  list: {
    // backgroundColor: 'rgb(13, 134, 214)',
    backgroundColor: '#333',
    paddingVertical: 15,
    marginVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
    flexDirection: 'row',
  },

  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({cart, auth, product}) => {
  return {
    cart,
    auth,
    product,
  };
};

export default connect(mapStateToProps)(Cart);

const Item = props => {
  return (
    <View
      style={[
        styles.list,
        {
          backgroundColor: 'rgb(13, 134, 214)',
          justifyContent: 'space-between',
        },
      ]}>
      <Text style={styles.text}>
        {props.data.name} {props.data.qtyDetail}x
      </Text>
      <Text style={styles.text}>Rp. {props.data.totalDetail}</Text>
    </View>
  );
};
