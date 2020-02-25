import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import Content from '../Components/Content'
import Hot from '../Components/Hot'
import { connect } from 'react-redux'
import { pagination, filterProduct } from '../Publics/Redux/actions/product'
import { getAllCart, addProductToCart } from '../Publics/Redux/actions/cart'
import { getAllCategory } from '../Publics/Redux/actions/category'
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
            cartData: [],
            tokenData: '',
            loading: false,
            page: 1,
            keyword: '',
            categoryKey: '',
            dataAfterFilter: [],
            cart: {
                id_user: '',
                qty: 1,
                id_product: ''
            },
            scrool: false,
            show: false
        }
        this.search = _.debounce(this.search, 1000)
    }


    getProduct = async () => {
        const page = this.state.page;
        const category = this.state.categoryKey;
        const keyword = this.state.keyword;
        await this.props.dispatch(pagination(page, category, keyword));
        this.setState({
            product: this.state.product.concat(this.props.product.productData[2])
        });
        this.morepage()
    }
    search = async () => {
        const page = this.state.page;
        const category = this.state.categoryKey;
        const keyword = this.state.keyword;
        await this.props.dispatch(pagination(page, category, keyword));
        this.morepage()
        this.setState({
            product: this.props.product.productData[2]
        });
    }

    morepage = () => {
        if (!this.props.product.productData[2]) {
            this.setState({
                show: false
            })
        } else if (this.state.page < this.props.product.productData[0]) {
            this.setState({
                show: true
            })
        } else {
            this.setState({
                show: false
            })
        }
    }
    componentDidMount = async () => {
        await this.getProduct()
        await this.props.dispatch(getAllCategory());
    }

    addToCart = (product) => {
        if (product.stok > 0) {
            const newCart = { ...this.state.cart }
            newCart.id_product = product.id
            newCart.id_user = 10
            this.setState({
                cart: newCart
            }, () => {
                const data = this.state.cart
                this.props.dispatch(addProductToCart(data))
                // alert('add to cart')
            })
        }
    }

    onSearch = (key) => {
        this.setState({
            keyword: key,
            page: 1,
            scrool: false,
            show: false
        }, () => {
            this.search()
        })
    }

    nextpage = () => {
        if (this.state.page < this.props.product.productData[0]) {
            this.setState({
                page: this.state.page + 1,
                scrool: true
            }, () => {
                this.getProduct()
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    // barStyle="dark-content"
                    hidden={false}
                    backgroundColor="#3f026b"
                    translucent={false}
                    networkActivityIndicatorVisible={true}
                />
                <View style={{ position: 'relative', paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#3f026b', flexDirection: 'row' }}>
                    <View style={{ flex: 1, position: "relative" }}>
                        <TextInput placeholder='I want to search ...' style={styles.search} onChangeText={(key) => this.onSearch(key)} />
                        <Image source={require('../Assets/img/search.png')} style={{ position: 'absolute', top: 12, left: 12 }} />
                    </View>
                    <View style={{ justifyContent: 'center', marginHorizontal: 11, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
                            <Text style={{ fontWeight: "bold", fontSize: 14, color: '#F4A501' }}>Cart({this.props.cart.cartData.length})</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* content */}
                <ScrollView
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.state.scrool ? this.scrollView.scrollToEnd({ animated: true }) : null
                    }}
                >
                    <View style={styles.content}>
                        {/* Hot featured */}
                        {/* <View style={{ backgroundColor: '#ddd', paddingVertical: 10, flex: 1 }}>
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
                        </View> */}

                        {/* Second Featured */}

                        <View style={{ paddingHorizontal: 10, flex: 1, backgroundColor: '#fff', flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}>
                            {
                                !this.props.product.isPending ?
                                    this.state.product.map(data => {
                                        return (
                                            <Content key={data.id} data={data} onPress={this.addToCart} />
                                        )
                                    }) : (
                                        <View style={{ flex: 1, backgroundColor: '#fff', marginTop: '50%' }}>
                                            <ActivityIndicator size="large" color="#ff33ff" />
                                        </View>
                                    )
                            }
                        </View>


                    </View>
                    {
                        this.state.show ?
                            <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center', margin: 10, borderRadius: 20, padding: 5, backgroundColor: '#fff' }} onPress={() => this.nextpage()}><Text>More</Text></TouchableOpacity>
                            : null
                    }
                </ScrollView>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    content: {
        flex: 1
    },
    search: {
        backgroundColor: '#eee',
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

const MapStateToProps = ({ product, cart, category, auth }) => {
    return {
        product, cart, category, auth
    }
}

export default connect(MapStateToProps)(Home)
