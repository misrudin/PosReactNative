import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class ChangePassword extends Component {
    render() {
        return (
            <>
                <ScrollView style={styles.container}>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Old Password</Text>
                        <TextInput style={styles.txtInput} onChangeText={(e) => null} />
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>New Password</Text>
                        <TextInput style={styles.txtInput} onChangeText={(e) => null} />
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Repeat New Password</Text>
                        <TextInput style={styles.txtInput} onChangeText={(e) => null} />
                    </View>

                    <View style={styles.sectionBtn}>
                        <TouchableOpacity style={styles.styleBtn} onPress={this.edit}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.styleBtn} onPress={() => this.props.navigation.navigate('Acount')}>
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

const mapStateToProps = ({ category }) => {
    return {
        category
    }
}

export default connect(mapStateToProps)(ChangePassword)
