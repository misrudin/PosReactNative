import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login, savetoken} from '../Publics/Redux/actions/auth';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {isPending} = useSelector(state => state.auth);

  const saveMyToken = token => {
    dispatch(savetoken(token));
  };

  const humanEdan = () => {
    if (username === '') {
      ToastAndroid.show('Hmm, Username cannot be empty !', ToastAndroid.SHORT);
      return false;
    } else if (password === '') {
      ToastAndroid.show('Hmm, Password cannot be empty !', ToastAndroid.SHORT);
      return false;
    } else {
      return true;
    }
  };

  const handleLogin = () => {
    if (humanEdan()) {
      const data = {
        username,
        password,
      };
      dispatch(login(data))
        .then(res => {
          if (res.value.data.msg) {
            ToastAndroid.show(res.value.data.msg, ToastAndroid.SHORT);
          } else {
            saveMyToken(res.value.data.token);
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
        <TextInput
          placeholder="Username..."
          style={styles.textInput}
          onChangeText={e => setUsername(e)}
          keyboardType={'email-address'}
          autoCapitalize="none"
          value={username}
        />
        <TextInput
          placeholder="Password..."
          style={styles.textInput}
          onChangeText={e => setPassword(e)}
          secureTextEntry
          autoCapitalize="none"
          value={password}
        />
        {!isPending ? (
          <TouchableOpacity style={styles.login} onPress={() => handleLogin()}>
            <Text style={styles.txtLogin}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.login}>
            <ActivityIndicator size="small" color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.register}
          onPress={() => navigation.navigate('Register')}>
          <Text style={{color: '#3a7bd5', fontWeight: 'bold'}}>
            Not have account ? Lets Register
          </Text>
        </TouchableOpacity>
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
    marginTop: 10,
  },
});

export default Login;
