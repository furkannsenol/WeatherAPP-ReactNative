import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import TabRouter from './tabRouter';

const Stack = createStackNavigator()

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='TabRouter'
                screenOptions={{
                    headerTransparent: true,
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name='TabRouter'
                    component={TabRouter}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router