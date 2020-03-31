import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  // ToastAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getTotal, getAllCart} from '../Publics/Redux/actions/cart';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ListCart = props => {
  const {cartData} = useSelector(state => state.cart);
  const {token} = useSelector(state => state.auth);
  const {productall} = useSelector(state => state.product);
  const [cart, setCart] = useState(props.data);
  const dispatch = useDispatch();

  const sendQty = () => {
    dispatch(getAllCart(token));
  };

  const addQty = async data => {
    let id = data.id;
    let newQty = {...cart};
    newQty.qty = newQty.qty + 1;
    const dataFilter = productall.filter(
      product => product.id.toString() === data.id_product.toString(),
    );
    // console.warn(dataFilter);
    if (newQty.qty > dataFilter[0].stok) {
      Alert.alert('Sorry', 'Limit of Stock !', [{text: 'OK'}], {
        cancelable: true,
      });
      // ToastAndroid.show('Opss, Limit of Stock !', ToastAndroid.SHORT);
    } else {
      setCart(newQty);
      props.add(data);
      // sendQty();
    }
  };

  const minQty = async data => {
    let newQty = {...cart};
    newQty.qty = newQty.qty - 1;
    let qty = cart.qty - 1;
    if (qty < 1) {
      Alert.alert(
        'Sure ?',
        'Do you want to remove this item?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              props.min(data);
              props.minDel(data);
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      setCart(newQty);
      props.min(data);
      // sendQty();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionleft}>
        <View>
          <Image source={{uri: props.data.image}} style={styles.img} />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginLeft: 10,
            }}>
            <Text style={{color: '#0000ff', fontWeight: 'bold', fontSize: 16}}>
              {props.data.name}
            </Text>
            <Text style={{color: '#acacac'}}>
              Rp. {props.data.price * cart.qty}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 30,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => minQty(props.data)}>
              <Text style={styles.reducer}>-</Text>
            </TouchableOpacity>
            <Text style={{color: '#999', marginRight: 30}}>{cart.qty}</Text>
            <TouchableOpacity onPress={() => addQty(props.data)}>
              <Text style={styles.reducer}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.sectionright}>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => props.minDel(props.data, cart.qty)}>
          <Icon name="trash" size={15} color="rgb(128, 6, 57)" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 4,
    width: '98%',
    alignSelf: 'center',

    shadowOffset: {width: 2, height: 1},
    shadowColor: '#000',
    shadowRadius: 1,
    shadowOpacity: 1,
    elevation: 2,
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
    borderRadius: 6,
  },
  reducer: {
    marginRight: 30,
    fontWeight: 'bold',
    fontSize: 25,
    color: 'green',
  },
});

export default ListCart;
