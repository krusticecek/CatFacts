import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, ImageBackground, StyleSheet, TextInput} from 'react-native';
import {AsyncStorage} from 'react-native';


export default function HomeScreen({navigation}) {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [inputValue, setInputValue] = useState("");

    function pagingNext() {
        setPage(page + 1);
        getData();
    }

    // get data from API
    const getData = async () => {
        try {

            // get first data
            const response = await fetch(`https://catfact.ninja/fact?max_length=1?page=${page}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'X-CSRF-TOKEN': 'P1rW3FK3itZUTLZ84G7tvi7zHMzvas2JT0hR8yRz'

                }
            });
            const json = await response.json();
            setData(json);

        } catch (err) {
            console.log(err.message);
        }

    };
    // console.log(data)

    useEffect(() => {
        pagingNext();
    }, []);

    async function addItem(key, value) {
        try {

            const existingArray = await AsyncStorage.getItem(key);
            let currentArray = existingArray ? JSON.parse(existingArray) : [];

            if (!currentArray.includes(value)) {
                currentArray.push(value);
            }

            await AsyncStorage.setItem(key, JSON.stringify(currentArray));

        } catch (error) {
            console.log(error);
        }
    }

    function updateValue(inputValue) {
        console.log(inputValue);
        if (inputValue && inputValue !== '') {
            addItem("test", inputValue)
        }
    }

    return (
        <>
            <ImageBackground source={require('../assets/splash_logo.png')} style={styles.logo}/>
            <View style={styles.mainContainer}>
                {/* FACT */}
                <TouchableOpacity onPress={() => addItem('test', data.fact)}>
                    <Text style={{backgroundColor: 'white', fontSize: '20', padding: 8}}>
                        {data.fact}
                    </Text>
                </TouchableOpacity>

                <View style={{display: "flex"}}>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={pagingNext} style={styles.button}>
                            <Text style={styles.text}>New cat fact</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Liked')} style={styles.button}>
                            <Text style={styles.text}>Liked Facts</Text>
                        </TouchableOpacity>
                    </View>


                    <View>
                        <TextInput
                            placeholder={"Write your fact ..."}
                            placeholderTextColor='#000000'
                            value={inputValue}
                            onChangeText={text => setInputValue(text)}
                            style={styles.textInput}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={() => updateValue(inputValue)}
                            style={styles.button}
                        >
                            <Text style={styles.text}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </>

    );
}

const styles = StyleSheet.create({
    logo: {
        position: 'absolute',
        width: '100%',
        height: '80%'
    },
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        margin: 12,

    },
    button: {
        marginTop: 10,
        padding: 8,
        backgroundColor: '#00BAFF',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    buttons: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    textInput: {
        fontSize: 16,
        fontWeight: "bold",
        backgroundColor: '#ffffff',
        marginTop: 80,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 12,
        padding: 12,
    }

});