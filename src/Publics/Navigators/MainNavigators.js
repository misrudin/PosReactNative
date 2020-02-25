import React, { Component } from 'react'
import { Image } from 'react-native'
import Home from '../../Screens/Home';
import Login from '../../Screens/Login';
import Register from '../../Screens/Register';
import Product from '../../Screens/Product';
import Category from '../../Screens/Category';
import Acount from '../../Screens/Acount'
import Cart from '../../Screens/Cart'
import Loading from '../../Screens/Loading'
import InputProduct from '../../Screens/InputProduct'
import History from '../../Screens/History'
import InputCategory from '../../Screens/InputCategory'
import EditCategory from '../../Components/EditCategory'
import EditProduct from '../../Components/EditProduct'
import ChangePassword from '../../Components/ChangePassword'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainNavigators = () => {
    return (
        <>
            <Tab.Navigator
                initialRouteName="Home"
                backBehavior="none"
                tabBarOptions={{
                    activeTintColor: '#F4A501',
                    activeBackgroundColor: 'grey',
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../../Assets/img/home.png')} style={{ width: 26, height: 26 }} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Product"
                    component={Product}
                    options={{
                        tabBarLabel: 'Product',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../../Assets/img/home.png')} style={{ width: 26, height: 26 }} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Category"
                    component={Category}
                    options={{
                        tabBarLabel: 'Category',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../../Assets/img/home.png')} style={{ width: 26, height: 26 }} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="History"
                    component={History}
                    options={{
                        tabBarLabel: 'History',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../../Assets/img/home.png')} style={{ width: 26, height: 26 }} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Acount"
                    component={Acount}
                    options={{
                        tabBarLabel: 'Acount',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../../Assets/img/home.png')} style={{ width: 26, height: 26 }} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

class AuthNavigator extends Component {

    render() {
        return (
            <Tab.Navigator
                initialRouteName="loading"
                backBehavior="none"
                tabBarOptions={{
                    activeTintColor: '#F4A501',
                    activeBackgroundColor: 'grey',
                }}
            >
                <Tab.Screen
                    name="Loading"
                    component={Loading}
                    options={{
                        tabBarLabel: 'Loading',
                        tabBarVisible: false,
                    }}
                />
                <Tab.Screen
                    name="Login"
                    component={Login}
                    options={{
                        tabBarLabel: 'Login',
                        tabBarVisible: false,
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={MainNavigators}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarVisible: false,
                    }}
                />
                <Tab.Screen
                    name="Register"
                    component={Register}
                    options={{
                        tabBarLabel: 'Register',
                        tabBarVisible: false,
                    }}
                />
            </Tab.Navigator>
        )
    }
}

export const SubNavigator = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Auth">
                    <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name='InputProduct' component={InputProduct} options={{ headerTitle: 'Add Product' }} />
                    <Stack.Screen name='EditProduct' component={EditProduct} options={{ headerTitle: 'Edit Product' }} />
                    <Stack.Screen name='InputCategory' component={InputCategory} options={{ headerTitle: 'Add Category' }} />
                    <Stack.Screen name='EditCategory' component={EditCategory} options={{ headerTitle: 'Edit Category' }} />
                    <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ headerTitle: 'Change Password' }} />
                    <Stack.Screen name="Cart" component={Cart} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}




export default SubNavigator
