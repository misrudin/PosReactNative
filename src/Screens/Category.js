import React, { Component } from 'react'
import { View, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native'
import ListCategory from '../Components/ListCategory'
import { connect } from 'react-redux'
import { getAllCategory, deleteCategory } from '../Publics/Redux/actions/category'

class Category extends Component {
    state = {
        category: []
    }

    getCategory = async () => {
        await this.props.dispatch(getAllCategory());
        const category = this.props.category.categoryData
        this.setState({
            category
        })
    }
    handleDelete = (id) => {
        this.props.dispatch(deleteCategory(id))
        alert('oke')
    }

    showData = (data) => {
        this.props.navigation.navigate('EditCategory', { data: data })
    }

    componentDidMount() {
        this.getCategory()
    }

    render() {
        return (

            <View style={{ backgroundColor: 'white', marginBottom: 60 }}>
                <View style={{ alignItems: 'center', paddingVertical: 10, backgroundColor: 'white', paddingHorizontal: 16, flexDirection: 'row' }}>
                    <TextInput placeholder="I want to search..." style={{ flex: 1, backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: "#ddd", paddingVertical: 5, paddingHorizontal: 20 }} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InputCategory')}>
                        <Text style={{ marginHorizontal: 20 }}>Add</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    {
                        this.state.category ?
                            this.state.category.map(data => {
                                return (
                                    <ListCategory key={data.id} data={data} onDelete={this.handleDelete} edit={this.showData} />
                                )
                            }) : (
                                <Text>Loading gaes...</Text>
                            )
                    }
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({ category }) => {
    return {
        category
    }
}

export default connect(mapStateToProps)(Category)