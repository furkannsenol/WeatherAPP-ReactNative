import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../page/home';
import Search from '../page/search';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const Tab = createBottomTabNavigator();

const TabRouter = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            safeAreaInsets={{ //Fixed Bottom-Tab jump bug
                top: 0,
                bottom: 15,
                left: 0,
                right: 0,
            }}
            screenOptions={{
                tabBarActiveTintColor: '#f3f3f3',
                tabBarInactiveTintColor: '#13d94e',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    borderTopWidth: 0,
                    shadowColor: 'transparent'
                },
                tabBarShowLabel: false,

            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Menu"
                component={Search}
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="menu" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabRouter

