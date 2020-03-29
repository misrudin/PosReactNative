import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ToastAndroid,
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
          ToastAndroid.show('Yey, Add Category Success', ToastAndroid.SHORT);
          clear();
          props.navigation.navigate('Category');
        })
        .catch(() => {
          ToastAndroid.show('Opss, Add Failed', ToastAndroid.SHORT);
        });
    } else {
      ToastAndroid.show('Hmm, Please comlete input !', ToastAndroid.SHORT);
    }
  };

  const clear = () => {
    setCategory('');
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            paddingVertical: 20,
            justifyContent: 'center',
            borderRadius: 5,
            shadowOffset: {width: 2, height: 2},
            shadowColor: '#000',
            shadowRadius: 10,
            shadowOpacity: 1,

            elevation: 4,
          }}>
          <View style={styles.sectionInput}>
            <Text style={{color: '#020', fontWeight: 'bold', marginBottom: 5}}>
              Category Name
            </Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={e => setCategory(e)}
              autoFocus
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
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  sectionInput: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  txtInput: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: 6,
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
    backgroundColor: '#3a7bd5',
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 15,
    margin: 10,
  },
});

export default InputCategory;
