import React, { Component } from 'react'
import { Image } from 'react-native'
import Home from '../../Screens/Home';
import Login from '../../Screens/Login';
import Register from '../../Screens/Register';
import Product from '../../Screens/Product';
import Category from '../../Screens/Category';
import Acount from '../../Screens/Acount'
import Cart from '../../Screens/Cart'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { getToken } from '../Redux/actions/auth'

const Tab = createBottomTabNavigator();

const MainNavigators = () => {
    return (
        <>
            <Tab.Navigator
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
    state = {
        Token: ''
    }

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    backBehavior="none"
                    tabBarOptions={{
                        activeTintColor: '#F4A501',
                        activeBackgroundColor: 'grey',
                    }}
                >
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
                    <Tab.Screen
                        name="Cart"
                        component={Cart}
                        options={{
                            tabBarLabel: 'Cart',
                            tabBarVisible: false,
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer >
        )
    }
}

export const SubNavigator = () => {
    return (
        <>
            <Tab.Navigator>
                <Tab.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        tabBarLabel: 'Cart',
                        tabBarVisible: false,
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}


export default connect(mapStateToProps)(AuthNavigator)
