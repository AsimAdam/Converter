import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import WebView from 'react-native-webview';

const ChartScreen = ({navigation, route}: any) => {
    const { url, nav } = route?.params;
    return(
        <View style={styles.container}>
            {nav &&
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/back.png')} style={styles.icon} />
                </TouchableOpacity>
            }
            <WebView source={{uri: url}} />
        </View>
    )
};

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff"
    },
    icon: {
        width: 30,
        height: 30,
    },
});

export default ChartScreen;