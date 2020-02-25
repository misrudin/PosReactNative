import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Picker, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import { addProduct } from '../Publics/Redux/actions/product'

const options = {
    title: 'Add product image',
    mediaType: 'photo',
    maxWidth: 1024,
    maxHeight: 1024,
    storageOptions: {
        skipBackup: true,
        path: 'posApp',
    },
};

class InputProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formProduct: {
                image: null,
                name: '',
                description: '',
                stok: '',
                price: '',
                id_category: ''
            },
            category: []
        }
    }


    getCategory = async () => {
        const category = this.props.category.categoryData
        this.setState({
            category
        })
    }

    showImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    formProduct: { image: source, }
                });

            }
        });
    }

    handleSave = () => {
        const { name, description, stok, price, id_category, image } = this.state.product
        let fd = new FormData()
        fd.append('image', image, image.name)
        fd.append('name', name)
        fd.append('description', description)
        fd.append('stok', stok)
        fd.append('price', price)
        fd.append('id_category', id_category)
        this.props.dispatch(addProduct(fd));
        this.props.navigation.navigate('Product')
    }

    handleChange = (name, description, stok, price, id_category) => {
        console.log(name)
        // let newProduct = { ...this.state.formProduct };
        // newProduct.name = name
        // newProduct.description = description
        // newProduct.stok = stok
        // newProduct.price = price
        // newProduct.id_category = id_category
        // this.setState({
        //     formProduct: newProduct
        // })
    }

    componentDidMount = () => {
        console.warn(this.props.dataProduct)
        this.getCategory()
        // let newData = { ...this.state.formProduct };
        // newData.description = this.props.route.params.data.description
        // newData.stok = this.props.route.params.data.stok
        // newData.price = this.props.route.params.data.price
        // newData.name = this.props.route.params.data.name
        // newData.image = this.props.route.params.data.image
        // newData.id = this.props.route.params.data.id
        // this.setState({
        //     formProduct: newData
        // })
    }
    render() {
        const { name, description, stok, price, id_category, image } = this.state.formProduct
        return (
            <>
                <ScrollView style={styles.container}>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Name</Text>
                        <TextInput style={styles.txtInput}
                            value={name}
                        />
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Description</Text>
                        <TextInput style={styles.txtInput}
                            onChangeText={(description) => this.handleChange(description)} value={description}
                        />
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Stok</Text>
                        <TextInput style={styles.txtInput}
                            onChangeText={(stok) => this.handleChange(stok)} value={stok}
                        />
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Price</Text>
                        <TextInput style={styles.txtInput}
                            onChangeText={(price) => this.handleChange(price)} value={price}
                        />
                    </View>

                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Category</Text>
                        <View style={{ borderColor: '#ddd', borderRadius: 8, borderWidth: 1, backgroundColor: '#fff' }}>
                            <Picker style={{ color: '#999' }}
                                selectedValue={id_category}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.handleChange(itemValue)
                                }
                            >
                                {
                                    this.state.category.map(category => {
                                        return (
                                            <Picker.Item key={category.id} label={category.nama_category} value={category.id} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.sectionInput}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={image} style={{ width: 100, height: 100, borderWidth: 1, borderColor: '#ddd' }} />
                            <TouchableOpacity style={styles.btn} onPress={() => this.showImage()} >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Chose Image</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.sectionBtn}>
                        <TouchableOpacity style={styles.styleBtn} onPress={() => this.handleSave()}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.styleBtn} onPress={() => this.props.navigation.navigate('Product')}>
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
    },
    btn: {
        backgroundColor: 'salmon',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginLeft: 10,
        alignSelf: 'flex-end'
    }
})

const mapStateToProps = ({ product, category }) => {
    return {
        product, category
    }
}

export default connect(mapStateToProps)(InputProduct)
