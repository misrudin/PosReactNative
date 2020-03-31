import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../Publics/Redux/actions/auth';

const Register = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const {isPending} = useSelector(state => state.auth);

  const humanEdan = () => {
    if (name === '') {
      ToastAndroid.show('Hmm, Username cannot be empty !', ToastAndroid.SHORT);
      return false;
    } else if (password === '' || password.length < 4) {
      ToastAndroid.show(
        'Hmm, Password cannot be empty and minimum 4 of character !',
        ToastAndroid.SHORT,
      );
      return false;
    } else if (password !== password2) {
      ToastAndroid.show('Hmm, Password not same !', ToastAndroid.SHORT);
      setPassword('');
      setPassword2('');
      return false;
    } else {
      return true;
    }
  };

  const handleSignUp = async () => {
    if (humanEdan()) {
      const data = {
        username: name,
        password,
        role: 2,
      };
      dispatch(register(data))
        .then(res => {
          if (res.value.data.msg) {
            ToastAndroid.show(res.value.data.msg, ToastAndroid.SHORT);
          } else {
            ToastAndroid.show(
              'Yeey, Register Success, Please Login!',
              ToastAndroid.SHORT,
            );
            navigation.navigate('Login');
          }
        })
        .catch(() => {
          ToastAndroid.show('Opss, Error Connection', ToastAndroid.SHORT);
        });
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={styles.container}>
        <ScrollView>
          <TextInput
            placeholder="Username..."
            style={styles.textInput}
            onChangeText={e => setName(e)}
            value={name}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password..."
            style={styles.textInput}
            onChangeText={e => setPassword(e)}
            value={password}
            autoCapitalize="none"
            secureTextEntry
          />
          <TextInput
            placeholder="Repeat Password..."
            style={styles.textInput}
            onChangeText={e => setPassword2(e)}
            value={password2}
            autoCapitalize="none"
            secureTextEntry
          />

          {!isPending ? (
            <TouchableOpacity
              style={styles.login}
              onPress={() => handleSignUp()}>
              <Text style={styles.txtLogin}>Register</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.login}>
              <ActivityIndicator size="small" color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.register}
            onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#3a7bd5', fontWeight: 'bold'}}>
              Arealy have account? Back To Login
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 5,
    backgroundColor: '#f7f9fc',
    fontSize: 16,
  },
  container: {
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
  },
  login: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: '#3a7bd5',
    marginTop: 20,
  },
  txtLogin: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  register: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});

export default Register;
