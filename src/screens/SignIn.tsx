import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import { emptyFields, verifyUrl } from "../assets/constants";

const SignIn = ({navigation, route}: any) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [load, setLoad] = useState(false);
  const handleSignIn = async() => {
    if(email == "" || pass == ""){
      Alert.alert(emptyFields);
      return;
    }
    setLoad(true);
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({user: email, password: pass}),
    });
    const res = await response.json(); 
    setLoad(false);
    Alert.alert(res.message)
    if(res.message == "Account verified successfully"){
      await AsyncStorage.setItem("account", JSON.stringify(res.user));
      navigation.navigate("TopTabs");
    }
  };
  const handleSignUp = () => {
    navigation.navigate("Register")
  };
  const handlePasswordVisibilityToggle = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  const handleForgotPassword = () => {

  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.containerStyle}>
        <Image source={require("../assets/heading.png")} style={{width: 80, height: 80, alignSelf: "center", marginTop: 20}} resizeMode="contain" />
        <View style={styles.alignment}>
          <Text style={{fontWeight: "600", fontSize: 25, color: "white", marginTop: 20}}>CMT Pro</Text>
          <Text style={{fontWeight: "500", fontSize: 20, color: "white", marginTop: 20, textAlign: "center"}}>Experience the convenience of effortless currency conversion.</Text>
        </View>

        <View style={styles.alignment}>
          <TextInput
            style={styles.emailInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your name or email here"
            placeholderTextColor={"#d7d7d6"}
          />
          <View style={[styles.emailInput, {flexDirection: "row", alignItems: "center", justifyContent: "space-between"}]}>
            <TextInput
              placeholder="Enter your password here"
              value={pass}
              onChangeText={setPass}
              placeholderTextColor={"#d7d7d6"}
              style={styles.passwordInput}
              secureTextEntry={passwordVisibility}
            />
            <TouchableOpacity style={styles.eyeButton} onPress={handlePasswordVisibilityToggle}>
              <Icon name={passwordVisibility ? 'eye-off' : 'eye'} size={20} color='#d7d7d6' />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.alignment, {marginTop: 50}]}>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={{ color: 'white', fontSize: 18 }}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={{ color: '#0068FF', fontSize: 15, alignSelf: 'center', marginTop: 20 }}>Forget password?</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.alignment, {marginTop: 80}]}>
          <Text style={{ color: '#0068FF', fontSize: 15, alignSelf: 'center'}}>Don't have an account?</Text>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000",
    },
    containerStyle:{
      alignItems: "center"
    },
    emailInput: {
      width: Dimensions.get("screen").width * 0.90,
      height: 60,
      borderColor: "#d7d7d6",
      borderWidth: 1,
      borderRadius: 8,
      marginTop: 40,
      fontFamily: "Poppins Medium",
      alignSelf: "center",
      color: "white",
      paddingHorizontal: 20,
      fontSize: 16
    },
    passwordInput: {
      color: "white",
      fontSize: 16
    },
    signUpButton: {
      backgroundColor: "#151617",
      borderRadius: 10,
      width: Dimensions.get("screen").width * 0.90,
      alignItems: 'center',
      alignSelf: "center",
      paddingVertical: 15,
      marginTop: 20 
    },
    signInButton: {
      backgroundColor: "#151617",
      borderRadius: 10,
      width: Dimensions.get("screen").width * 0.90,
      alignItems: 'center',
      alignSelf: "center",
      paddingVertical: 15,
      marginTop: 40
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
      width: 20,
      height: 20,
      alignSelf: "center"
    },
    alignment:{
      alignItems: "center", 
      flexDirection: "column"
    },
})

export default SignIn;