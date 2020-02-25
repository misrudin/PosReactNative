import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { deleteCart } from '../Publics/Redux/actions/cart'
import axios from 'axios'
const urls = 'http://ec2-54-173-178-155.compute-1.amazonaws.com:4001/api/v1/'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc'


class ListCart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            cart: []
        }
    }

    addQty = (id) => {
        let newQty = { ...this.state.cart }
        newQty.qty = newQty.qty + 1
        this.setState({
            cart: newQty
        })
        axios.patch(urls + `cart/add/${id}`, {
            headers: {
                token: token
            }
        })
    }
    minQty = (id) => {
        let newQty = { ...this.state.cart }
        newQty.qty = newQty.qty - 1
        let qty = this.state.cart.qty - 1
        if (qty < 1) {
            this.props.dispatch(deleteCart(id))
            this.setState({
                cart: this.props.cart.cartData
            })
        } else {
            this.setState({
                cart: newQty
            })
            axios.patch(urls + `cart/min/${id}`, {
                headers: {
                    token: token
                }
            })
        }
    }
    componentDidMount() {
        this.setState({
            cart: this.props.data
        })
    }
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.sectionleft}>
                    <View>
                        <Image source={{ uri: this.props.data.image }} style={styles.img} />
                    </View>
                    <View >
                        <View style={{ flexDirection: "column", justifyContent: 'flex-start', marginLeft: 10 }}>
                            <Text style={{ color: '#0000ff', fontWeight: 'bold', fontSize: 16 }} >{this.props.data.name}</Text>
                            <Text style={{ color: "#acacac" }}>Rp. {this.props.data.price}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginLeft: 30, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.minQty(this.props.data.id)}>
                                <Text style={styles.reducer}>-</Text>
                            </TouchableOpacity>
                            <Text style={{ color: '#999', marginRight: 30 }}>{this.state.cart.qty}</Text>
                            <TouchableOpacity onPress={() => this.addQty(this.props.data.id)}>
                                <Text style={styles.reducer}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.sectionright}>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.props.onDelete(this.props.data.id)}>
                        <Text style={{ color: 'salmon', fontSize: 14, fontWeight: 'bold' }}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
        borderColor: '#ddd'
    },
    sectionleft: {
        flex: 1,
        flexDirection: 'row'
    },
    img: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    reducer: {
        marginRight: 30,
        fontWeight: 'bold',
        fontSize: 25,
        color: 'green'
    }
})

const mapSateToProps = ({ cart, product }) => {
    return {
        cart, product
    }
}

export default connect(mapSateToProps)(ListCart)