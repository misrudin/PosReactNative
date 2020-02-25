import React, { Component } from 'react'
import { Text, View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'

export default class History extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.mountArea}>
                    <ScrollView>
                        <View style={styles.incomeArea1}></View>
                        <View style={styles.incomeArea2}></View>
                        <View style={styles.incomeArea3}></View>
                    </ScrollView>
                </View>
                <View style={styles.historyArea}>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fc'
    },
    mountArea: {
        backgroundColor: 'salmon',
        marginHorizontal: 16,
        marginTop: 10,
        flexDirection: 'row'
    },
    incomeArea1: {
        backgroundColor: "red",
        height: 200,
        marginLeft: 5,
        borderRadius: 6,
        flex: 1
    },
    incomeArea2: {
        backgroundColor: "green",
        flex: 1,
        height: 200,
        marginLeft: 5,
        borderRadius: 6
    },
    incomeArea3: {
        backgroundColor: "blue",
        flex: 1,
        height: 200,
        borderRadius: 6
    },
    historyArea: {
        backgroundColor: 'salmon',
        marginTop: 15,
        marginHorizontal: 16,
        flex: 1
    },
})
