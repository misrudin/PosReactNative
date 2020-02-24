import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

class Loading extends React.Component {
    state = {
        tokenData: ''
    }

    getToken = async () => {
        await AsyncStorage.getItem('Token', (err, token) => {
            this.setState({
                tokenData: token
            })
        })
    }

    componentDidMount = () => {
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

export default Loading
