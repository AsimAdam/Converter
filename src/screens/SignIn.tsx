import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import SignUp from "./SignUp";


const SignIn = () => {
const [passwordVisibility, setPasswordVisibility] = useState(true);
const navigation = useNavigation();
const handleSignIn = () => {

}
const handleSignUp = () => {
    navigation.navigate('SignUp' as never);
}
const handlePasswordVisibilityToggle = () => {
    setPasswordVisibility(!passwordVisibility);
  };


return (
    
    <View style={styles.container}>
      <Image source={require("../assets/icon.png")} style={{width: 200, height: 200, alignSelf: "center"}} resizeMode="contain" />
      <TextInput
        style={styles.emailInput}
        placeholder="Enter your name or email here"
        placeholderTextColor={"#d7d7d6"}
      />
     <TextInput
        style={styles.emailInput}
        placeholder="Enter your password here"
        placeholderTextColor={"#d7d7d6"}
        secureTextEntry={passwordVisibility}
      />
    
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={{ color: 'white', fontSize: 18 }}>Sign in</Text>
      </TouchableOpacity>
      <Text style={{ color: '#0068FF', fontSize: 15, alignSelf: 'center', marginTop: 10 }}>Forget password?</Text>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={{ color: '#0068FF', fontSize: 15, alignSelf: 'center', marginTop: 10 }}>You don't have account?</Text>
     
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center", 
        alignItems: "center", 
      },
      emailInput: {
        width: Dimensions.get("screen").width * 0.90,
        height: 60,
        borderColor: "#d7d7d6",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 20,
        fontFamily: "Poppins Medium",
        alignSelf: "center",
        color: "black",
        paddingHorizontal: 20,
        fontSize: 16
      },
      passwordInput: {
        width: Dimensions.get("screen").width * 0.90,
        height: 60,
        borderColor: "#d7d7d6",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 20,
        fontFamily: "Poppins Medium",
        alignSelf: "center",
        color: "black",
        paddingHorizontal: 20,
        fontSize: 16
      },
      signUpButton: {
        backgroundColor: "#151617",
        borderRadius: 10,
        width: Dimensions.get("screen").width * 0.90,
        alignItems: 'center',
        alignSelf: "center",
        marginTop: 170,
        paddingVertical: 15
      },
      signInButton: {
        backgroundColor: "#151617",
        borderRadius: 10,
        width: Dimensions.get("screen").width * 0.90,
        alignItems: 'center',
        alignSelf: "center",
        paddingVertical: 15,
        marginTop: 20
      },
      buttonText: {
        color: "white",
        fontSize: 18
      },
      spinnerText:{
        fontFamily: "Poppins Medium",
        color: "black",
        fontSize: 20
      },
      eyeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 20,
        height: 20,
  },
})

export default SignIn;