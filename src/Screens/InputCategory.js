import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Picker } from 'react-native'
import { connect } from 'react-redux'
import { addCategory } from '../Publics/Redux/actions/category'


class InputCategory extends Component {
    state = {
        formCategory: {
            id: '',
            category: ''
        },
    }

    handleChange = (e) => {
        let newData = { ...this.state.formCategory };
        newData.category = e
        this.setState({
            formCategory: newData
        })
    }

    postCategory = () => {
        const data = this.state.formCategory
        this.props.dispatch(addCategory(data));
        this.props.navigation.navigate('Category')
    }

    render() {
        return (
            <>
                <ScrollView style={styles.container}>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Category Name</Text>
                        <TextInput style={styles.txtInput} onChangeText={(e) => this.handleChange(e)} value={this.state.name} />
                    </View>

                    <View style={styles.sectionBtn}>
                        <TouchableOpacity style={styles.styleBtn} onPress={this.postCategory}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.styleBtn} onPress={() => this.props.navigation.navigate('Category')}>
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

export default connect(mapStateToProps)(InputCategory)
