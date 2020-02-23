import React from 'react'
import { ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base'

const ListCategory = () => {
    return (
        <>
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={require('../Assets/img/home.png')} />
                </Left>
                <Body>
                    <Text>Sankhadeep</Text>
                    <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                </Body>
                <Right style={{ flexDirection: 'row' }}>
                    <Button transparent>
                        <Text>Edit</Text>
                    </Button>
                    <Button transparent>
                        <Text>Delete</Text>
                    </Button>
                </Right>
            </ListItem>
        </>
    )
}

export default ListCategory
