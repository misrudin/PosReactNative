import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Picker,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
// import {addProduct} from '../Publics/Redux/actions/product';
import axios from 'axios';
const urls = 'http://ec2-54-173-178-155.compute-1.amazonaws.com:4001/api/v1/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc';

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
    id: '',
    name: '',
    description: '',
    stok: '',
    price: '',
    id_category: '',
    imgSrc: null,
    loading: false,
  };

  showImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        this.setState({
          image: source,
          imgSrc: response,
        });
      }
    });
  };

  handleSave = async () => {
    const {
      name,
      description,
      stok,
      price,
      id_category,
      imgSrc,
      id,
    } = this.state;
    if (name && description && stok && price && id_category) {
      this.setState({
        loading: true,
      });
      let fd = new FormData();
      fd.append('name', name);
      fd.append('description', description);
      fd.append('stok', stok);
      fd.append('price', price);
      fd.append('id_category', id_category);
      if (imgSrc !== null) {
        fd.append('image', {
          uri: imgSrc.uri,
          name: imgSrc.fileName,
          type: imgSrc.type,
        });
      }
      await axios
        .patch(urls + `product/${id}`, fd, {
          headers: {
            token: token,
          },
        })
        .then(() => {
          this.setState({
            loading: false,
          });
          Alert.alert('Congratulation', 'Edit Sucess!', [{text: 'OK'}]);
          this.props.navigation.navigate('Home');
          this.clear();
        })
        .catch(() => {
          Alert.alert('Opss', 'Edit Failed!', [{text: 'OK'}]);
        });
    } else {
      Alert.alert('Warning', 'Please comlete input!', [{text: 'OK'}]);
    }
  };

  clear = () => {
    const {
      name,
      description,
      stok,
      price,
      image,
      id_category,
      imgSrc,
    } = this.state;
    this.setState({
      name: '',
      description: '',
      stok: '',
      price: '',
      image: null,
      id_category: '',
      imgSrc: null,
    });
  };

  componentDidMount() {
    const data = this.props.route.params.data;
    this.setState({
      name: data.name,
      description: data.description,
      stok: data.stok.toString(),
      price: data.price.toString(),
      image: {uri: data.image},
      id_category: data.id_category,
      imgSrc: null,
      id: data.id,
    });
  }

  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <View style={styles.sectionInput}>
            <Text style={{color: '#020', fontWeight: 'bold', marginBottom: 5}}>
              Name
            </Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={e => this.setState({name: e})}
              value={this.state.name}
            />
          </View>
          <View style={styles.sectionInput}>
            <Text style={{color: '#020', fontWeight: 'bold', marginBottom: 5}}>
              Description
            </Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={e => this.setState({description: e})}
              value={this.state.description}
            />
          </View>
          <View style={styles.sectionInput}>
            <Text style={{color: '#020', fontWeight: 'bold', marginBottom: 5}}>
              Stok
            </Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={e => this.setState({stok: e})}
              value={this.state.stok}
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.sectionInput}>
            <Text style={{color: '#020', fontWeight: 'bold', marginBottom: 5}}>
              Price
            </Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={e => this.setState({price: e})}
              value={this.state.price}
              keyboardType={'numeric'}
            />
          </View>

          <View style={styles.sectionInput}>
            <Text style={{color: '#020', fontWeight: 'bold', marginBottom: 5}}>
              Category
            </Text>
            <View
              style={{
                borderColor: '#ddd',
                borderRadius: 8,
                borderWidth: 1,
                backgroundColor: '#fff',
              }}>
              <Picker
                style={{color: '#999'}}
                selectedValue={this.state.id_category}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({id_category: itemValue})
                }>
                <Picker.item label="Select categories.." value="" />
                {this.props.category.categoryData.map(category => {
                  return (
                    <Picker.Item
                      key={category.id}
                      label={category.nama_category}
                      value={category.id}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>

          <View style={styles.sectionInput}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={this.state.image}
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 1,
                  borderColor: '#ddd',
                  margin: 10,
                }}
              />
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.showImage()}>
                <Text style={{color: '#3f026b', fontWeight: 'bold'}}>
                  Chose Image
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionBtn}>
            {this.state.loading ? (
              <ActivityIndicator size="large" color="#ff33ff" />
            ) : (
              <TouchableOpacity
                style={styles.styleBtn}
                onPress={() => this.handleSave()}>
                <Text style={{color: 'white', fontSize: 16}}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fc',
    paddingHorizontal: 16,
  },
  sectionInput: {
    marginTop: 20,
    position: 'relative',
    paddingHorizontal: 20,
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
    marginTop: 4,
  },
  sectionBtn: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  styleBtn: {
    backgroundColor: '#3f026b',
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 15,
    margin: 10,
  },
  btn: {
    borderColor: '#3f026b',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
});

const mapStateToProps = ({product, category}) => {
  return {
    product,
    category,
  };
};

export default connect(mapStateToProps)(InputProduct);
