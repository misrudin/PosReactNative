import React, { Component } from 'react'
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native'
import ListCart from '../Components/ListCart'
import { connect } from 'react-redux'
import { getAllCart } from '../Publics/Redux/actions/cart'

class Cart extends Component {
    state = {
        cart: [],
        formCheckOut: {
            faktur: '',
            id_user: '',
            qty: '',
            total: ''
        },
    }


    getCart = async () => {
        await this.props.dispatch(getAllCart())
        this.setState({
            cart: this.props.cart.cartData
        })
    };

    okeCheckout = () => {
        const data = this.state.formCheckOut
        this.props.dispatch(checkOutAll(data))
    }

    handleCheckout = () => {
        const newCheckOut = { ...this.state.formCheckOut }
        newCheckOut.faktur = new Date().getTime()
        newCheckOut.id_user = 10
        newCheckOut.qty = this.state.cart.length
        newCheckOut.total = 10000
        this.setState({
            formCheckOut: newCheckOut
        })
        this.okeCheckout()
    }

    componentDidMount() {
        this.getCart()
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <ScrollView style={{ backgroundColor: '#FFF', flex: 1 }}>
                    {
                        !this.props.cart.isPending ?
                            this.state.cart.map(data => {
                                return (
                                    <ListCart key={data.id} data={data} />
                                )
                            }) : (
                                <View style={{ flex: 1, backgroundColor: '#fff', marginTop: '50%' }}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            )

                    }
                </ScrollView>
                <View style={styles.foot}>
                    <TouchableOpacity style={styles.footer} onPress={() => this.handleCheckout}>
                        <Text style={{ color: 'green', fontSize: 'bold', fontSize: 16 }}>Checkout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footer} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={{ color: 'salmon', fontSize: 'bold', fontSize: 16 }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        marginHorizontal: 40
    },
    foot: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        flexDirection: 'row',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})


const mapStateToProps = ({ cart }) => {
    return {
        cart
    }
}

export default connect(mapStateToProps)(Cart)