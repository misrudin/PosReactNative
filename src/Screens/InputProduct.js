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
    noData: true,
    cropping: true,
    storageOptions: {
        skipBackup: true,
        path: 'posApp',
    },
};

class InputProduct extends Component {
    state = {
        image: null,
        name: '',
        description: '',
        stok: '',
        price: '',
        id_category: '',
        imgSrc: null
    }

    showImage = () => {
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    image: source,
                    imgSrc: response
                });

            }
        });
    }

    handleSave = async () => {
        const { name, description, stok, price, id_category, imgSrc } = this.state
        let fd = new FormData()
        fd.append('name', name)
        fd.append('description', description)
        fd.append('stok', stok)
        fd.append('price', price)
        fd.append('id_category', id_category)
        fd.append("image", {
            uri: imgSrc.uri,
            name: imgSrc.fileName,
            type: imgSrc.type
        })

        await this.props.dispatch(addProduct(fd));
        this.props.navigation.navigate('Product')
    }
    render() {
        return (
            <>
                <ScrollView style={styles.container}>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Name</Text>
                        <TextInput style={styles.txtInput}
                            onChangeText={(e) => this.setState({ name: e })} value={this.state.name}
                        />
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Description</Text>
                        <TextInput style={styles.txtInput}
                            onChangeText={(e) => this.setState({ description: e })} value={this.state.description}
                        />
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Stok</Text>
                        <TextInput style={styles.txtInput}
                            onChangeText={(e) => this.setState({ stok: e })} value={this.state.stok}
                        />
                    </View>
                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Price</Text>
                        <TextInput style={styles.txtInput}
                            onChangeText={(e) => this.setState({ price: e })} value={this.state.price}
                        />
                    </View>

                    <View style={styles.sectionInput}>
                        <Text style={{ color: '#020', fontWeight: 'bold', marginBottom: 5 }}>Category</Text>
                        <View style={{ borderColor: '#ddd', borderRadius: 8, borderWidth: 1, backgroundColor: '#fff' }}>
                            <Picker style={{ color: '#999' }}
                                selectedValue={this.state.id_category}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ id_category: itemValue })
                                }
                            >
                                {
                                    this.props.category.categoryData.map(category => {
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
                            <Image source={this.state.image} style={{ width: 100, height: 100, borderWidth: 1, borderColor: '#ddd' }} />
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
