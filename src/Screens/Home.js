import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import Navbar from '../Components/Navbar'
import Content from '../Components/Content'
import Hot from '../Components/Hot'
import Header from '../Components/Header'
import { connect } from 'react-redux'
import { getAllProduct } from '../Publics/Redux/actions/product'
import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component {
    state = {
        product: [],
        tokenData: ''
    }


    getProduct = async () => {
        await this.props.dispatch(getAllProduct());
        const product = this.props.product.productData
        this.setState({
            product: product
        })
    }

    getToken = async () => {
        await AsyncStorage.getItem('Token', (err, token) => {
            this.setState({
                tokenData: token
            })
            console.log('ini token', token)
        })
    }
    componentDidMount() {
        this.getToken()
        this.getProduct()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ position: 'relative', paddingHorizontal: 16, paddingVertical: 10, backgroundColor: 'white', flexDirection: 'row' }}>
                    <Header onPress={() => this.props.navigation.navigate('Cart')} />
                </View>
                {/* content */}
                <ScrollView>
                    <View style={styles.content}>
                        {/* Hot featured */}
                        <View style={{ backgroundColor: '#ddd', paddingVertical: 10, flex: 1 }}>
                            <ScrollView horizontal style={{ height: '100%', borderRadius: 5, flexDirection: 'row', paddingLeft: 16 }}>
                                <Hot />
                                <Hot />
                                <Hot />
                            </ScrollView>
                        </View>

                        {/* Second Featured */}

                        <View style={{ paddingHorizontal: 10, flex: 1, backgroundColor: '#eee', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                this.state.product ?
                                    this.state.product.map(data => {
                                        return (
                                            <Content key={data.id} data={data} />
                                        )
                                    }) : (
                                        <Text>Loading gaes...</Text>
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
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    content: {
        flex: 1
    }
})

const MapStateToProps = ({ product }) => {
    return {
        product
    }
}

export default connect(MapStateToProps)(Home)
