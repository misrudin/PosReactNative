import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {addCategory} from '../Publics/Redux/actions/category';
import {useDispatch, useSelector} from 'react-redux';

const InputCategory = props => {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const {token} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const postCategory = () => {
    const data = {
      category,
    };
    if (data.category) {
      setLoading(true);
      dispatch(addCategory(data, token))
        .then(() => {
          setLoading(false);
          Alert.alert('Congratulation', 'Add Sucess!', [{text: 'OK'}]);
          clear();
          props.navigation.navigate('Category');
        })
        .catch(() => {
          Alert.alert('Opss', 'Add Failed!', [{text: 'OK'}]);
        });
    } else {
      Alert.alert('Warning', 'Please comlete input!', [{text: 'OK'}]);
    }
  };

  const clear = () => {
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
            <TouchableOpacity
              style={styles.styleBtn}
              onPress={() => postCategory()}>
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

export default InputCategory;
