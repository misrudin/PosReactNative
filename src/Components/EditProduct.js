import React, {useState} from 'react';
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
import {editProduct} from '../Publics/Redux/actions/product';
import {useDispatch, useSelector} from 'react-redux';

const EditProduct = ({navigation, route}) => {
  const [image, setImage] = useState(route.params.data.image);
  const [name, setName] = useState(route.params.data.name);
  const [id, setIdp] = useState(route.params.data.id);
  const [description, setDescription] = useState(route.params.data.description);
  const [stok, setStok] = useState(route.params.data.stok.toString());
  const [price, setPrice] = useState(route.params.data.price.toString());
  const [id_category, setId] = useState(route.params.data.id_category);
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector(state => state.auth);
  const {categoryData} = useSelector(state => state.category);
  const dispatch = useDispatch();

  const showImage = () => {
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
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImgSrc(response);
      }
    });
  };

  const handleSave = async () => {
    if (name && description && stok && price && id_category) {
      setLoading(true);
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
      await dispatch(editProduct(id, fd, token))
        .then(() => {
          setLoading(false);
          Alert.alert('Congratulation', 'Edit Sucess!', [{text: 'OK'}]);
          clear();
          navigation.navigate('Home');
        })
        .catch(() => {
          Alert.alert('Opss', 'Edit Failed!', [{text: 'OK'}]);
        });
    } else {
      Alert.alert('Warning', 'Please comlete input!', [{text: 'OK'}]);
    }
  };

  const clear = () => {
    setName('');
    setDescription('');
    setId('');
    setImage(null);
    setImgSrc(null);
    setStok('');
    setPrice('');
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.sectionInput}>
          <Text style={{color: '#020', fontWeight: 'bold', marginBottom: 5}}>
            Name
          </Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={e => setName(e)}
            value={name}
          />
        </View>
        <View style={styles.sectionInput}>
          <Text style={{color: '#020', fontWeight: 'bold', marginBottom: 5}}>
            Description
          </Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={e => setDescription(e)}
            value={description}
          />
        </View>
        <View style={styles.sectionInput}>
          <Text style={{color: '#020', fontWeight: 'bold', marginBottom: 5}}>
            Stok
          </Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={e => setStok(e)}
            value={stok}
            keyboardType={'numeric'}
          />
        </View>
        <View style={styles.sectionInput}>
          <Text style={{color: '#020', fontWeight: 'bold', marginBottom: 5}}>
            Price
          </Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={e => setPrice(e)}
            value={price}
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
              selectedValue={id_category}
              onValueChange={(itemValue, itemIndex) => setId(itemValue)}>
              <Picker.item label="Select categories.." value="" />
              {categoryData.map(category => {
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
              source={imgSrc !== null ? {uri: imgSrc.uri} : {uri: image}}
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: '#ddd',
                margin: 10,
              }}
            />
            <TouchableOpacity style={styles.btn} onPress={() => showImage()}>
              <Text style={{color: '#3f026b', fontWeight: 'bold'}}>
                Chose Image
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionBtn}>
          {loading ? (
            <ActivityIndicator size="large" color="#ff33ff" />
          ) : (
            <TouchableOpacity
              style={styles.styleBtn}
              onPress={() => handleSave()}>
              <Text style={{color: 'white', fontSize: 16}}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </>
  );
};

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
    marginTop: 40,
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

export default EditProduct;
