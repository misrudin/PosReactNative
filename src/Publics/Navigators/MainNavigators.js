import React from 'react';
import {useSelector} from 'react-redux';
import Home from '../../Screens/Home';
import Login from '../../Screens/Login';
import Register from '../../Screens/Register';
import Category from '../../Screens/Category';
import Acount from '../../Screens/Acount';
import Loading from '../../Screens/Loading';
import InputProduct from '../../Screens/InputProduct';
import {History} from '../../Screens/History';
import InputCategory from '../../Screens/InputCategory';
import Cart from '../../Screens/Cart';
import EditCategory from '../../Components/EditCategory';
import EditProduct from '../../Components/EditProduct';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainNavigators = () => {
  return (
    <>
      <Tab.Navigator
        backBehavior="none"
        tabBarOptions={{
          activeTintColor: '#fff',
          activeBackgroundColor: '#3a7bd5',
          inactiveTintColor: '#3a7bd5',
          inactiveBackgroundColor: '#fff',
          keyboardHidesTabBar: true,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={22} color="#D39D38" />
            ),
          }}
        />
        <Tab.Screen
          name="InputProduct"
          component={InputProduct}
          options={{
            tabBarLabel: 'Add Product',
            tabBarIcon: ({color, size}) => (
              <Icon name="plus-circle" size={24} color="#D39D38" />
            ),
          }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{
            unmountOnBlur: true,
            tabBarLabel: 'Category',
            tabBarIcon: ({color, size}) => (
              <Icon name="tags" size={24} color="#D39D38" />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({color, size}) => (
              <Icon name="history" size={24} color="#D39D38" />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const AuthNav = () => {
  const {loading, token} = useSelector(state => state.auth);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Stack.Navigator>
        {token === null ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={MainNavigators}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="InputCategory"
              component={InputCategory}
              options={{headerShown: true, title: 'Add Category'}}
            />
            <Stack.Screen
              name="EditCategory"
              component={EditCategory}
              options={{headerShown: true, title: 'Add Category'}}
            />
            <Stack.Screen
              name="EditProduct"
              component={EditProduct}
              options={{
                headerShown: true,
                animationEnabled: true,
                title: 'Edit Product',
              }}
            />
            <Stack.Screen
              name="Acount"
              component={Acount}
              options={{headerShown: true, title: 'My Account'}}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                headerShown: true,
                animationEnabled: false,
                title: 'Cart',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default AuthNav;
