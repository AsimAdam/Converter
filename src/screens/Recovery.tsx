import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import OTPInputView from '@twotalltotems/react-native-otp-input'

const Recovery = () => {

    const handleBack = () => {
        // navigation.goBack();
      }
    const handleConfirm = () => {

    }
return (
    <View style={styles.container}>
     <TouchableOpacity onPress={handleBack} style={{ position: 'absolute', top: 10, left: 2 }}>
        <Image source={require('../assets/back.png')} style={styles.icon} />
      </TouchableOpacity>
    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 130 }}>Enter Recovery Code</Text>
    <OTPInputView
    style={{width: '80%', height: 200}}
    pinCount={6}
    autoFocusOnLoad
    codeInputFieldStyle={styles.underlineStyleBase}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    onCodeFilled = {(code => {
        console.log(`Code is ${code}, you are good to go!`)
    })}
/>
<TouchableOpacity style={styles.confirmInButton} onPress={handleConfirm}>
        <Text style={{ color: 'white', fontSize: 18 }}>Confirm</Text>
      </TouchableOpacity>
</View>
)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',   
    },
    icon: {
        width: 30,
        height: 30,
      },
    borderStyleBase: {
        width: 30,
        height: 45
      },
    
      borderStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    
      underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
      },
    
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
      },
      confirmInButton: {
        backgroundColor: "#151617",
        borderRadius: 10,
        width: Dimensions.get("screen").width * 0.40,
        alignItems: 'center',
        alignSelf: "center",
        paddingVertical: 15
      }
})


export default Recovery;