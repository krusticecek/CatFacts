import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import HomeScreen from "./Screens/HomeScreen";
import LikeScreen from "./Screens/LikeScreen";
import SplashScreen from "./Screens/SplashScreen";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{gestureEnabled: false, headerBackVisible: false}}/>
                <Stack.Screen name="Liked" component={LikeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

