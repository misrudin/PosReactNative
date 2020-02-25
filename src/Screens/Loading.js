import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { getAllProduct } from '../Publics/Redux/actions/product'
import { getAllCart } from '../Publics/Redux/actions/cart'
import { getAllCategory } from '../Publics/Redux/actions/category'

class Loading extends React.Component {
    state = {
        tokenData: ''
    }

    getProduct = async () => {
        await this.props.dispatch(getAllProduct());
        await this.props.dispatch(getAllCart());
        await this.props.dispatch(getAllCategory());
    }

    getToken = async () => {
        await AsyncStorage.getItem('Token', (err, token) => {
            this.setState({
                tokenData: token
            })
        })
    }

    componentDidMount = () => {
        this.getProduct()
        this.getToken()
        setTimeout(() => {
            if (this.state.tokenData) {
                this.props.navigation.navigate('Home')
            } else {
                this.props.navigation.navigate('Login')
            }
        }, 500)
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})

const MapStateToProps = ({ product, cart, category }) => {
    return {
        product, cart, category
    }
}

export default connect(MapStateToProps)(Loading)
