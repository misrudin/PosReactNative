import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {editCategory} from '../Publics/Redux/actions/category';
import {useDispatch, useSelector} from 'react-redux';

const EditCategory = props => {
  const {token} = useSelector(state => state.auth);
  const [id, setId] = useState(props.route.params.data.id);
  const [category, setCategory] = useState(
    props.route.params.data.nama_category,
  );
  const [loading, setLoding] = useState(false);
  const dispatch = useDispatch();

  const edit = () => {
    const data = {
      id,
      category,
    };
    if (data.category) {
      setLoding(true);
      dispatch(editCategory(data, token)).then(() => {
        setLoding(false);
        Alert.alert('Congratulation', 'Edit Sucess!', [{text: 'OK'}]);
        clear();
        props.navigation.navigate('Category');
      });
    } else {
      Alert.alert('Warning', 'Please comlete input!', [{text: 'OK'}]);
    }
  };

  const clear = () => {
    setId('');
    setCategory('');
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.sectionInput}>
          <Text style={{color: '#020', fontWeight: 'bold', marginBottom: 5}}>
            Category Name
          </Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={e => setCategory(e)}
            value={category}
          />
        </View>

        <View style={styles.sectionBtn}>
          {loading ? (
            <ActivityIndicator size="large" color="#ff33ff" />
          ) : (
            <TouchableOpacity style={styles.styleBtn} onPress={edit}>
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
});

export default EditCategory;
