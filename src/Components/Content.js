import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const Content = (props) => {
    return (
        <>
            <View style={{ width: '50%', height: 250, padding: 6, position: 'relative' }} >
                <View style={{ borderWidth: 1, borderColor: '#eee', flex: 1, backgroundColor: '#eee', borderRadius: 6, overflow: 'hidden', position: 'relative', shadowColor: '#eee', shadowOffset: { width: 2, height: 2 } }}>
                    <TouchableOpacity>
                        <Image source={{ uri: props.data.image }} style={{ width: '100%', height: '100%' }} />
                    </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center' }}>{props.data.name}</Text>
                <Text style={{ textAlign: 'center' }}>Rp. {props.data.price} </Text>
            </View>
        </>
    )
}

export default Content
