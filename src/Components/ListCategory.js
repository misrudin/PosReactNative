import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'

const ListCategory = (props) => {
    console.log(props)
    return (
        <View style={styles.container}>
            <View style={styles.sectionleft}>
                <TouchableOpacity onPress={() => props.edit(props.data)}>
                    <Text style={{ color: '#0000ff', fontWeight: 'bold', fontSize: 16 }} >{props.data.nama_category}</Text>
                    <Text style={{ color: "#acacac" }}>80 item product in this category</Text>
                </TouchableOpacity>
            </View>
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
        flex: 1
    }
})

export default ListCategory
