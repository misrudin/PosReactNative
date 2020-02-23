import React from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

const Header = (props) => {
    return (
        <>
            <View style={{ flex: 1, position: "relative" }}>
                <TextInput placeholder='I want to search ...' style={styles.search} />
                <Image source={require('../Assets/img/search.png')} style={{ position: 'absolute', top: 12, left: 12 }} />
            </View>
            <View style={{ justifyContent: 'center', marginLeft: 10, alignItems: "center" }}>
                <TouchableOpacity onPress={props.onPress}>
                    <Text>Cart(0)</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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

export default Header
