import * as React from 'react';
import {View, Image, StyleSheet, Pressable, Text} from 'react-native';

export default function logoWelcome({ navigation }) {

    function navToFitbitAuth() {
      navigation.navigate('FitbitAuth')
    }

    return (
        <View style={styles.container}>

            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>

            <Image
                style ={{width: '100%', height: '14%'}}
                source = {require('../assets/DaiaLogoGifLong.gif')}
            />
            <Text>  </Text>
            <Text>  </Text>
            <Text style={styles.subTitle}>Live Better</Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>

            <Pressable style={styles.button} onPress={navToFitbitAuth}>
                <Text style={styles.text}>Click Here To Start</Text>
            </Pressable>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>
            <Text>  </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container :{
        alignContent:'center',
        margin:1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subTitle : {
        fontWeight: 'bold',
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
})