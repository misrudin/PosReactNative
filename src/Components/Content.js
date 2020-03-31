import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

const Content = props => {
  const {cartData} = useSelector(state => state.cart);
  const [cart, setCart] = useState([]);
  const [muncul, setMuncul] = useState(false);

  useEffect(() => {
    setCart(props.dataCart);
  }, [props.dataCart]);

  useEffect(() => {
    // console.log(cart);
    const arr = [];
    cart.map(idp => {
      return arr.push(idp.id_product);
    });
    const cek = (element, index, array) => {
      return element === props.data.id;
    };
    const sm = () => {
      const val = arr.some(cek);
      if (val) {
        setMuncul(true);
      } else {
        setMuncul(false);
      }
    };

    sm();
  }, [cart, props.data.id]);

  return (
    <>
      <View style={muncul ? styles.containercart : styles.container}>
        <TouchableOpacity
          onPress={
            muncul
              ? null
              : props.data.stok === 0
              ? null
              : () => {
                  props.press(props.data);
                  setMuncul(true);
                }
          }
          activeOpacity={muncul ? 1 : props.data.stok === 0 ? 1 : 0.5}>
          <Image source={{uri: props.data.image}} style={styles.imageLeft} />
        </TouchableOpacity>
        <View style={styles.detail}>
          <Text
            style={
              props.data.stok === 0
                ? [styles.title, {color: 'rgb(128, 6, 57)'}]
                : props.data.stok <= 10
                ? [styles.title, {color: 'rgb(214, 160, 13)'}]
                : styles.title
            }>
            {props.data.name}
          </Text>
          <Text style={styles.price}>Rp. {props.data.price}</Text>
          <Text style={styles.description}>{props.data.description}</Text>
          <Text style={styles.description}>Stok : {props.data.stok}</Text>
          <View style={styles.footer}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity onPress={() => props.show(props.data)}>
                <Icon name="edit" size={15} color="rgb(214, 160, 13)" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={muncul ? null : () => props.delete(props.data)}>
                <Icon
                  name="trash"
                  size={15}
                  color="rgb(128, 6, 57)"
                  style={{marginLeft: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '95%',
    marginBottom: 7,
    marginTop: 7,
    borderRadius: 10,
    shadowOffset: {width: 5, height: 5},
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    position: 'relative',
  },
  containercart: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '95%',
    marginBottom: 7,
    marginTop: 7,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    position: 'relative',
    opacity: 0.7,
    shadowOffset: {width: 5, height: 5},
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 2,
  },
  imageLeft: {
    width: 120,
    height: 120,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  detail: {
    marginLeft: 8,
    width: 210,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  description: {
    color: '#acacac',
    maxHeight: 32,
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
export default Content;
