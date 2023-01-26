import React, { useEffect } from 'react';
import {View, StyleSheet, ActivityIndicator, Text, ImageBackground} from 'react-native';

function SplashScreen({navigation}) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 4000);
    }, []);

    return (
        <>
        <View style={styles.neco}>
            <ImageBackground source={require('../assets/splash_logo.png')} style={styles.logo} />
            <Text style={{position:'absolute'}}>LOADING...</Text>
            <ActivityIndicator style={{position:'absolute'}} size="large" color="#000"  />
        </View>
        </>

    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    neco: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    logo: {
        position: 'absolute',
        width: '100%',
        height: '75%'
    }
});