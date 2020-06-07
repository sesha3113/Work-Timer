/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import Home from './src/Components/Home/Home';
import Finish from './src/Components/Finish/FinishView';
import History from './src/Components/History/History';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  createAppContainer,
} from '@react-navigation/stack';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default class App extends Component {
  state = {};
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={HomeTab} />
          <Stack.Screen name="Finish" component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function HomeTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'pink',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#696969',
        style: {
          borderTopWidth: 1,
          paddingTop: 5,
        },
        labelStyle: {
          fontSize: 20,
        },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}
