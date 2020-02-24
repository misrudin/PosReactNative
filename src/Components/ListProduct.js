import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ListItem, Thumbnail, Text, Left, Body, Right } from 'native-base'

const ListProduct = (props) => {
    return (
        <>
            <ListItem thumbnail>
                <TouchableOpacity>
                    <Left>
                        <Thumbnail square source={{ uri: props.data.image }} />
                    </Left>
                    <Body>
                        <Text>{props.data.name}</Text>
                        <Text note numberOfLines={1}>{props.data.description}</Text>
                    </Body>
                </TouchableOpacity>
                <Right style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </Right>
            </ListItem>
        </>
    )
}

export default ListProduct
