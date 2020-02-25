import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import Content from '../Components/Content'
import Hot from '../Components/Hot'
import { connect } from 'react-redux'
import { getAllProduct } from '../Publics/Redux/actions/product'
import { getAllCart, addProductToCart } from '../Publics/Redux/actions/cart'
import { getAllCategory } from '../Publics/Redux/actions/category'
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

class Home extends Component {

    state = {
        product: [],
        cartData: [],
        tokenData: '',
        loading: false,
        search: '',
        dataAfterFilter: [],
        cart: {
            id_user: '',
            qty: 1,
            id_product: ''
        },
    }
    onSearch = (key) => {
        this.setState({
            search: key,
            loading: true
        })
        setTimeout(() => {
            this.search(key)
        }, 1000)
    }

    search = () => {
        let dataAfterFilter = this.state.product.filter((product) => {
            return product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        })
        this.setState({
            loading: false,
            dataAfterFilter: dataAfterFilter
        })
    }

    getProduct = async () => {
        await this.props.dispatch(getAllProduct());
        await this.props.dispatch(getAllCart());
        await this.props.dispatch(getAllCategory());
        const product = this.props.product.productData
        const cart = this.props.cart.cartData
        this.setState({
            product: product,
            cartData: cart
        })
        this.search()
    }

    getToken = async () => {
        await AsyncStorage.getItem('Token', (err, token) => {
            this.setState({
                tokenData: token
            })
            console.log('ini token', token)
        })
    }

    addToCart = (data) => {
        let product = data
        if (product.stok > 0) {
            const newCart = { ...this.state.cart }
            newCart.id_product = product.id
            newCart.id_user = 10
            this.setState({
                cart: newCart
            }, () => {
                const data = this.state.cart
                this.props.dispatch(addProductToCart(data))
                alert('add to cart')
            })
        }
    }

    componentDidMount() {
        this.getToken()
        this.getProduct()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ position: 'relative', paddingHorizontal: 16, paddingVertical: 10, backgroundColor: 'white', flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd' }}>
                    <View style={{ flex: 1, position: "relative" }}>
                        <TextInput placeholder='I want to search ...' style={styles.search} onChangeText={(key) => this.onSearch(key)} />
                        <Image source={require('../Assets/img/search.png')} style={{ position: 'absolute', top: 12, left: 12 }} />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 10, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
                            <Text>Cart({this.props.cart.cartData.length})</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* content */}
                <ScrollView>
                    <View style={styles.content}>
                        {/* Hot featured */}
                        <View style={{ backgroundColor: '#ddd', paddingVertical: 10, flex: 1 }}>
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
                        </View>

                        {/* Second Featured */}

                        <View style={{ paddingHorizontal: 10, flex: 1, backgroundColor: '#eee', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                !this.props.product.isPending && !this.state.loading ?
                                    this.state.dataAfterFilter.length < 1 ? (
                                        <View style={{ flex: 1, backgroundColor: '#eee', marginTop: '50%' }}>
                                            <ActivityIndicator size="large" color="#ff33ff" />
                                            <Text style={{ textAlign: 'center', color: '#999', marginTop: 10 }}>Waiting Result !</Text>
                                        </View>
                                    ) :
                                        this.state.dataAfterFilter.map(data => {
                                            return (
                                                <Content key={data.id} data={data} onPress={this.addToCart} />
                                            )
                                        }) : (
                                        <View style={{ flex: 1, backgroundColor: '#eee', marginTop: '50%' }}>
                                            <ActivityIndicator size="large" color="#0000ff" />
                                        </View>
                                    )
                            }
                        </View>

                    </View>
                </ScrollView>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        flexDirection: 'column'
    },
    content: {
        flex: 1
    },
    search: {
        backgroundColor: 'white',
        paddingLeft: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingRight: 20,
        color: 'grey',
        fontSize: 14,
        paddingVertical: 5
    }
})

const MapStateToProps = ({ product, cart, category }) => {
    return {
        product, cart, category
    }
}

export default connect(MapStateToProps)(Home)
