import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import {AsyncStorage} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function LikeScreen() {

    const [data, setData] = useState([]);
    const navig = useNavigation();

    async function getItem() {
        try {

            const existingArray = await AsyncStorage.getItem('test');
            let currentArray = existingArray ? JSON.parse(existingArray) : [];

            setData(currentArray);

        } catch (error) {
            console.log(error);
        }
    }

    async function removeData(item) {
        try {

            const arrayString = await AsyncStorage.getItem('test');
            const array = JSON.parse(arrayString);

            const index = array.indexOf(item);
            array.splice(index, 1);

            await AsyncStorage.setItem('test', JSON.stringify(array));
            await getItem();

        } catch (error) {
            console.log(error);
        }
    }

    async function clearStorage() {
        AsyncStorage.clear();
    }

    useEffect(() => {
        navig.addListener('focus', getItem);
    }, []);


    // if you fuck up, uncomment this :)
    // console.log(data)
    // clearStorage()

    return data.length <= 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ImageBackground source={require('../assets/splash_logo.png')} style={styles.logo}/>
            <Text style={{backgroundColor: 'white', fontSize: '20'}}>No facts liked</Text>
        </View>
    ) : (
        <>
            <ImageBackground source={require('../assets/splash_logo.png')} style={styles.logo}/>
            <ScrollView>
                {data.map((item) =>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{backgroundColor: 'white', fontSize: '20',marginTop:10}}>{item.toString()}</Text>
                        <TouchableOpacity onPress={() => removeData(item)} style={styles.Unlike}>
                            <Text style={styles.text}>Unlike</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </>
    );

}


const styles = StyleSheet.create({
    Unlike: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'orangered',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15
    },
    Back: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'lightblue',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        position:"fixed",
        top:0,
        left:100
    },
    logo: {
        position: 'absolute',
        width: '100%',
        height: '80%'
    },
    text:{
        fontSize: 15,
        fontWeight:"bold"
    }
});