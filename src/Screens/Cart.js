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
  getQty,
} from '../Publics/Redux/actions/cart';
import axios from 'axios';
const urls = 'http://ec2-54-173-178-155.compute-1.amazonaws.com:4001/api/v1/';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc';

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
    total: 0,
    id_user: '',
    show: false,
  };

  hide = async () => {
    this.setState({
      show: false,
    });
    await this.props.navigation.navigate('Home');
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

    const newTotal = [];
    cart.forEach(e => {
      newTotal.push(e.qty * e.price);
    });
    this.setState({
      total: newTotal.reduce((a, b) => a + b, 0),
    });

    this.props.dispatch(getQty(this.state.qty));
  };

  getCart = async () => {
    await this.props.dispatch(getAllCart());
    this.setState({
      cart: this.props.cart.cartData,
    });
    await this.sendQty();
  };

  okeCheckout = async () => {
    const data = this.state.formCheckOut;
    await this.props.dispatch(checkOutAll(data));
    await this.sendQty();
    this.setState({
      show: true,
    });
  };

  handleCheckout = () => {
    const newCheckOut = {...this.state.formCheckOut};
    newCheckOut.faktur = new Date().getTime();
    newCheckOut.id_user = this.state.id_user;
    newCheckOut.qty = this.state.cart.length;
    newCheckOut.total = this.state.total;
    this.setState(
      {
        formCheckOut: newCheckOut,
      },
      () => {
        Alert.alert(
          'Checkout',
          'Click OK to continue transaction!',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.okeCheckout()},
          ],
          {cancelable: false},
        );
      },
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
    await this.props.dispatch(deleteAll());
    await this.sendQty();
    this.props.navigation.navigate('Home');
  };

  addQty = async id => {
    axios
      .patch(urls + `cart/add/${id}`, {
        headers: {
          token: token,
        },
      })
      .then(async () => {
        await this.sendQty();
      });
  };
  minQty = async (id, qty) => {
    axios
      .patch(urls + `cart/min/${id}`, {
        headers: {
          token: token,
        },
      })
      .then(async () => {
        await this.sendQty();
      });
  };

  minDel = async id => {
    await this.props.dispatch(deleteCart(id)).then(() => {
      this.setState({
        cart: this.props.cart.cartData,
      });
    });
    await this.sendQty();
  };

  getToken = async () => {
    await AsyncStorage.getItem('id', (err, id) => {
      this.setState({
        id_user: id,
      });
    });
  };
  componentDidMount() {
    this.getCart();
    this.getToken();
  }

  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.show}
          onRequestClose={() => this.hide()}>
          <ScrollView
            style={{
              backgroundColor: '#fff',
              flex: 1,
              padding: 40,
            }}>
            <View style={{flex: 1}}>
              <Text style={{color: '#000'}}>Product</Text>
            </View>

            <TouchableOpacity
              onPress={this.hide}
              style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 'bold',
                  fontSize: 16,
                  backgroundColor: '#3f026b',
                  borderRadius: 8,
                  padding: 10,
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
        <ScrollView style={{backgroundColor: '#FFF', flex: 1}}>
          {!this.props.cart.isPending ? (
            this.state.cart.length < 1 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 300,
                }}>
                <Icon
                  name="shopping-bag"
                  size={80}
                  color="#3f026b"
                  style={{justifyContent: 'center'}}
                />
                <Text style={{color: '#3f026b'}}>Your cart is Empty!</Text>
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
            )
          ) : (
            <View style={{flex: 1, backgroundColor: '#fff', marginTop: '50%'}}>
              <ActivityIndicator size="large" color="#ff33ff" />
            </View>
          )}
        </ScrollView>
        {!this.state.cart.length < 1 ? (
          <View style={styles.foot}>
            <TouchableOpacity
              style={styles.footer}
              onPress={() => this.handleCheckout()}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 'bold',
                  fontSize: 16,
                  backgroundColor: '#3f026b',
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
                  fontSize: 'bold',
                  fontSize: 16,
                  backgroundColor: '#c7040e',
                  borderRadius: 8,
                  padding: 10,
                }}>
                Cancel Transaction
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
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
    backgroundColor: 'white',
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = ({cart}) => {
  return {
    cart,
  };
};

export default connect(mapStateToProps)(Cart);
