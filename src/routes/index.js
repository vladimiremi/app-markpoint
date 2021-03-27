import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Collaborator from '../pages/Collaborator';

const Auth = createStackNavigator();

export default function AuthRoutes() {
    return(
        <Auth.Navigator
            screenOptions={{
                headerShown: true,
                cardStyle: { backgroundColor: 'white' }
            }}
        >
            <Auth.Screen name='Login' component={Login} />
            <Auth.Screen name='Collaborator' component={Collaborator} />
        </Auth.Navigator>
    )
}