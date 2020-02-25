import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'

const ListCart = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.sectionleft}>
                <View>
                    <Image source={{ uri: props.data.image }} style={styles.img} />
                </View>
                <View >
                    <View style={{ flexDirection: "column", justifyContent: 'flex-start', marginLeft: 10 }}>
                        <Text style={{ color: '#0000ff', fontWeight: 'bold', fontSize: 16 }} >{props.data.name}</Text>
                        <Text style={{ color: "#acacac" }}>Rp. {props.data.price}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginLeft: 30, alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Text style={styles.reducer}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ color: '#999', marginRight: 30 }}>{props.data.qty}</Text>
                        <TouchableOpacity>
                            <Text style={styles.reducer}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.sectionright}>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => props.onDelete(props.data.id)}>
                    <Text style={{ color: 'salmon', fontSize: 14, fontWeight: 'bold' }}>Remove</Text>
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
    },
    reducer: {
        marginRight: 30,
        fontWeight: 'bold',
        fontSize: 25,
        color: 'green'
    }
})

export default ListCart
