import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'

const ListProduct = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => props.edit(props.data)}>
                <View style={styles.sectionleft}>
                    <View>
                        <Image style={styles.img} source={{ uri: props.data.image }} />
                    </View>
                    <View style={{ flexDirection: "column", justifyContent: 'center', marginLeft: 10 }}>
                        <Text style={{ color: '#0000ff', fontWeight: 'bold', fontSize: 16 }} >{props.data.name}</Text>
                        <Text style={{ color: "#acacac" }}>{props.data.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.sectionright}>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => props.onDelete(props.data.id)}>
                    <Text style={{ color: 'salmon', fontSize: 14, fontWeight: 'bold' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
    }
})

export default ListProduct
