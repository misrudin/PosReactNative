import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { ListItem, Text, Body, Right } from 'native-base'

const ListCategory = (props) => {
    return (
        <>
            <ListItem>
                <Body>
                    <TouchableOpacity onPress={() => props.edit(props.data)}>
                        <Text>{props.data.nama_category}</Text>
                        <Text note numberOfLines={1}>80 item product in this category</Text>
                    </TouchableOpacity>
                </Body>
                <Right>
                    <TouchableOpacity style={styles.btn} onPress={() => props.onDelete(props.data.id)}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </Right>
            </ListItem>
        </>
    )
}

const styles = StyleSheet.create({
    btn: {
        marginLeft: 5
    }
})

export default ListCategory
