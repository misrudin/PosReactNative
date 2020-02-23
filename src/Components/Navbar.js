import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const Navbar = (props) => {
    return (
        <>
            <View style={styles.navItem}>
                <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center' }} onPress={props.onPress}>
                    <View style={styles.navIcon}>
                        <Image source={props.img} style={{ width: 26, height: 26 }} />
                    </View>
                    <Text style={styles.navText}>{props.title}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    navItem: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navIcon: {
        backgroundColor: 'white',
        width: 26,
        height: 26
    },
    navText: {
        color: '#F4A501',
        marginTop: 4,
        fontSize: 10,
        textAlign: 'center'
    }
})

export default Navbar
