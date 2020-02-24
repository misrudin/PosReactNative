import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Picker } from 'react-native'

class InputProduct extends Component {

    render() {
        return (
            <>
                <ScrollView style={styles.container}>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Name</Text>
                        <TextInput style={styles.txtInput} />
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Description
                        </Text><TextInput style={styles.txtInput} />
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Stok</Text>
                        <TextInput style={styles.txtInput} />
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Price</Text>
                        <TextInput style={styles.txtInput} />
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Category</Text>
                        <View style={{ borderColor: '#ddd', borderRadius: 8, borderWidth: 1, backgroundColor: '#fff' }}>
                            <Picker style={{ color: '#999' }}>
                                {
                                    this.props.route.params.data.map(category => {
                                        return (
                                            <Picker.Item key={category.id} label={category.nama_category} value={category.id} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.sectionBtn}>
                        <TouchableOpacity style={styles.styleBtn}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.styleBtn}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fc',
        paddingHorizontal: 16
    },
    sectionInput: {
        marginTop: 20,
        position: "relative",
        paddingHorizontal: 20
    },
    txtInput: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        color: '#999',
        fontSize: 16,
        marginTop: 4
    },
    sectionBtn: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    styleBtn: {
        backgroundColor: 'salmon',
        borderRadius: 20,
        paddingHorizontal: 50,
        paddingVertical: 15,
        margin: 10
    }
})


export default InputProduct
