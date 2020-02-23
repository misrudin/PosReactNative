import AsyncStorage from '@react-native-community/async-storage';

export const getToken = (token) => {
    return {
        type: "TOKEN",
        payload: token
    }
}