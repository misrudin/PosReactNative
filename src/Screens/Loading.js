import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {getAllProduct} from '../Publics/Redux/actions/product';
import {getAllCart} from '../Publics/Redux/actions/cart';
import {getAllCategory} from '../Publics/Redux/actions/category';
import {saveToken} from '../Publics/Redux/actions/auth';

class Loading extends React.Component {
  state = {
    tokenData: '',
  };

  getProduct = async () => {
    await this.props.dispatch(getAllProduct());
    await this.props.dispatch(getAllCart());
    await this.props.dispatch(getAllCategory());
  };

  getToken = async () => {
    await AsyncStorage.getItem('Token', (err, token) => {
      this.setState(
        {
          tokenData: token,
        },
        async () => {
          await this.props.dispatch(saveToken(token));
        },
      );
    });
  };

  componentDidMount = () => {
    this.getProduct();
    this.getToken();
    setTimeout(() => {
      if (this.state.tokenData) {
        this.props.dispatch(saveToken(this.state.tokenData));
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Login');
      }
    }, 500);
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#085366'}}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#085366"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ff33ff" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

const MapStateToProps = ({product, cart, category, auth}) => {
  return {
    product,
    cart,
    category,
    auth,
  };
};

export default connect(MapStateToProps)(Loading);
