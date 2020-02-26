import React, {Component} from 'react';
import {Image} from 'react-native';
import Home from '../../Screens/Home';
import Login from '../../Screens/Login';
import Register from '../../Screens/Register';
import Product from '../../Screens/Product';
import Category from '../../Screens/Category';
import Acount from '../../Screens/Acount';
import Cart from '../../Screens/Cart';
import Loading from '../../Screens/Loading';
import InputProduct from '../../Screens/InputProduct';
import History from '../../Screens/History';
import InputCategory from '../../Screens/InputCategory';
import EditCategory from '../../Components/EditCategory';
import EditProduct from '../../Components/EditProduct';
import ChangePassword from '../../Components/ChangePassword';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome5';

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
          activeBackgroundColor: '#3f026b',
          inactiveTintColor: '#3f026b',
          inactiveBackgroundColor: '#fff',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={24} color="#900" />
            ),
          }}
        />
        <Tab.Screen
          name="InputProduct"
          component={InputProduct}
          options={{
            tabBarLabel: 'Add Product',
            tabBarIcon: ({color, size}) => (
              <Icon name="plus-circle" size={24} color="#900" />
            ),
          }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{
            tabBarLabel: 'Category',
            tabBarIcon: ({color, size}) => (
              <Icon name="tags" size={24} color="#900" />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({color, size}) => (
              <Icon name="history" size={24} color="#900" />
            ),
          }}
        />
        <Tab.Screen
          name="Acount"
          component={Acount}
          options={{
            tabBarLabel: 'Acount',
            tabBarIcon: ({color, size}) => (
              <Icon name="user" size={24} color="#900" />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

class AuthNavigator extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="loading"
        backBehavior="none"
        tabBarOptions={{
          activeTintColor: '#F4A501',
          activeBackgroundColor: '#007a3d',
        }}>
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
          component={login}
          options={{
            tabBarLabel: 'Loading',
            tabBarVisible: false,
          }}
        />
        <Tab.Screen
          name="Home"
          component={main}
          options={{
            tabBarLabel: 'Loading',
            tabBarVisible: false,
          }}
        />
      </Tab.Navigator>
    );
  }
}

class login extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Login"
        backBehavior="none"
        tabBarOptions={{
          activeTintColor: '#F4A501',
          activeBackgroundColor: '#007a3d',
        }}>
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarLabel: 'Login',
            tabBarVisible: false,
          }}
        />
      </Tab.Navigator>
    );
  }
}
class main extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="none"
        tabBarOptions={{
          activeTintColor: '#F4A501',
          activeBackgroundColor: '#007a3d',
        }}>
        <Tab.Screen
          name="Home"
          component={MainNavigators}
          options={{
            tabBarLabel: 'Home',
            tabBarVisible: false,
          }}
        />
        <Tab.Screen
          name="Logout"
          component={AuthNavigator}
          options={{
            tabBarLabel: 'Home',
            tabBarVisible: false,
          }}
        />
      </Tab.Navigator>
    );
  }
}

export const SubNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditProduct"
            component={EditProduct}
            options={{headerTitle: 'Edit Product'}}
          />
          <Stack.Screen
            name="InputCategory"
            component={InputCategory}
            options={{headerTitle: 'Add Category'}}
          />
          <Stack.Screen
            name="EditCategory"
            component={EditCategory}
            options={{headerTitle: 'Edit Category'}}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{headerTitle: 'Change Password'}}
          />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default SubNavigator;
