import React, { Component } from 'react'
import { View, ScrollView, TextInput, TouchableOpacity, Text, ActivityIndicator, StatusBar, Image } from 'react-native'
import ListCategory from '../Components/ListCategory'
import { connect } from 'react-redux'
import { deleteCategory, getAllCategory } from '../Publics/Redux/actions/category'

class Category extends Component {
    state = {
        category: [],
        loading: false,
        search: ''
    }

    onSearch = (key) => {
        this.setState({
            search: key,
            loading: true
        })
        setTimeout(() => {
            this.getCategory()
        }, 500)
    }

    getCategory = () => {
        const category = this.props.category.categoryData
        let dataAfterFilter = category.filter((category) => {
            return category.nama_category.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        })
        this.setState({
            category: dataAfterFilter,
            loading: false
        })
    }
    handleDelete = (id) => {
        this.props.dispatch(deleteCategory(id))
        setTimeout(() => {
            this.getCategory()
        }, 1000)
    }

    showData = (data) => {
        this.props.navigation.navigate('EditCategory', { data: data })
    }

    componentDidMount = () => {
        this.getCategory()
    }

    render() {
        return (

            <View style={{ backgroundColor: 'white', marginBottom: 60 }}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor="#3f026b"
                    translucent={false}
                    networkActivityIndicatorVisible={true}
                />
                <View style={{ alignItems: 'center', paddingVertical: 10, backgroundColor: '#3f026b', paddingHorizontal: 16, flexDirection: 'row' }}>
                    <TextInput onChangeText={(key) => this.onSearch(key)} placeholder="I want to search..." style={{ flex: 1, backgroundColor: '#eee', borderRadius: 20, borderWidth: 1, borderColor: "#ddd", paddingVertical: 5, paddingHorizontal: 20, paddingLeft: 40 }} />
                    <Image source={require('../Assets/img/search.png')} style={{ position: 'absolute', top: 22, left: 28 }} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('InputCategory')}>
                        <Text style={{ marginHorizontal: 20, fontWeight: "bold", fontSize: 14, color: '#F4A501' }}>Add</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ backgroundColor: '#fff', }}>
                    {
                        !this.props.category.isPending && !this.state.loading ?
                            this.state.category.map(data => {
                                return (
                                    <ListCategory key={data.id} data={data} onDelete={this.handleDelete} edit={this.showData} />
                                )
                            }) : (
                                <View style={{ flex: 1, backgroundColor: '#fff', marginTop: '50%' }}>
                                    <ActivityIndicator size="large" color="#ff33ff" />
                                </View>
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