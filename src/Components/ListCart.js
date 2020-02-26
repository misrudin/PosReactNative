import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {getAllProduct} from '../Publics/Redux/actions/product';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
const urls = 'http://ec2-54-173-178-155.compute-1.amazonaws.com:4001/api/v1/';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc';

class ListCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      product: [],
    };
  }

  addQty = async data => {
    let id = data.id;
    let newQty = {...this.state.cart};
    newQty.qty = newQty.qty + 1;
    this.state.product.forEach(e => {
      if (data.id_product === e.id) {
        if (newQty.qty > e.stok) {
          Alert.alert('Sorry', 'Limit of Stock !', [{text: 'OK'}], {
            cancelable: true,
          });
        } else {
          this.setState({
            cart: newQty,
          });
          this.props.add(id);
        }
      }
    });
  };
  minQty = async data => {
    let id = data.id;
    let newQty = {...this.state.cart};
    newQty.qty = newQty.qty - 1;
    let qty = this.state.cart.qty - 1;
    if (qty < 1) {
      Alert.alert(
        'Sure ?',
        'Do you want to remove this item?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => this.props.minDel(id)},
        ],
        {cancelable: false},
      );
    } else {
      this.setState({
        cart: newQty,
      });
      this.props.min(id);
    }
  };
  getProduct = async () => {
    await this.props.dispatch(getAllProduct());
    this.setState({
      product: this.props.product.productData,
    });
  };
  componentDidMount = async () => {
    this.getProduct();
    this.setState({
      cart: this.props.data,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionleft}>
          <View>
            <Image source={{uri: this.props.data.image}} style={styles.img} />
          </View>
          <View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                marginLeft: 10,
              }}>
              <Text
                style={{color: '#0000ff', fontWeight: 'bold', fontSize: 16}}>
                {this.props.data.name}
              </Text>
              <Text style={{color: '#acacac'}}>
                Rp. {this.props.data.price}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 30,
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => this.minQty(this.props.data)}>
                <Text style={styles.reducer}>-</Text>
              </TouchableOpacity>
              <Text style={{color: '#999', marginRight: 30}}>
                {this.state.cart.qty}
              </Text>
              <TouchableOpacity onPress={() => this.addQty(this.props.data)}>
                <Text style={styles.reducer}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.sectionright}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => this.props.minDel(this.props.data.id)}>
            <Icon name="trash" size={22} color="#c7040e" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#ddd',
  },
  sectionleft: {
    flex: 1,
    flexDirection: 'row',
  },
  img: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  reducer: {
    marginRight: 30,
    fontWeight: 'bold',
    fontSize: 25,
    color: 'green',
  },
});

const mapSateToProps = ({cart, product}) => {
  return {
    cart,
    product,
  };
};

export default connect(mapSateToProps)(ListCart);
