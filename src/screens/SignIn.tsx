import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import { emptyFields, resetUrl, verifyUrl } from "../assets/constants";
import Modal from "react-native-modal";
import { SecondModalComponent } from "../assets/controllers/Modal";

const SignIn = ({navigation, route}: any) => {
  const [slogan, setSlogan] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [load, setLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
  const handleForgotPassword = async() => {
    if(name == "" || password == "" || recoveryCode == ""){
      Alert.alert("Please input the name/email, recovery code, and new password to reset");
      return;
    }
    const response = await fetch(resetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({name: name, password: password, code: recoveryCode}),
    });
    const res = await response.json(); 
    if(res.message == "Password reset successfully"){
      setModalVisible(false);
      Alert.alert(res.message + " " + ", please log in to continue");
    }
    else{
      Alert.alert(res.message);
    }
  };

  const getTitle = async() => {
    const response = await fetch(resetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      }, 
      body: "CMT Pro",
    });
    const res = await response.json(); 
    setSlogan(res);
  };

  useEffect(() => {
    getTitle();
  },[]);

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.containerStyle}>
        <Image source={require("../assets/logo.png")} style={{width: 100, height: 100, alignSelf: "center", marginTop: 20}} resizeMode="contain" />
        <View style={styles.alignment}>
          <Text style={{fontWeight: "600", fontSize: 25, color: "white", marginTop: 20}}>CMT Pro</Text>
          {slogan !== "" ?
            <Text style={{fontWeight: "500", fontSize: 20, color: "white", marginTop: 20, textAlign: "center"}}>Experience the convenience of effortless currency conversion.</Text>
          : null}
        </View>

        <View style={styles.alignment}>
          <TextInput
            style={styles.emailInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Account name/email"
            placeholderTextColor={"#DFDFDF"}
          />
          <View style={[styles.emailInput, {flexDirection: "row", alignItems: "center", justifyContent: "space-between"}]}>
            <TextInput
              placeholder="Password"
              value={pass}
              onChangeText={setPass}
              placeholderTextColor={"#DFDFDF"}
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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{ color: '#076AFF', fontSize: 15, alignSelf: 'center', marginTop: 20 }}>Forget password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.alignment, {marginTop: 80}]} onPress={handleSignUp}>
          <Text style={{ color: '#d7d7d6', fontSize: 18, alignSelf: 'center'}}>Don't have an account?{"  "}
            <Text style={{color: "#076AFF"}}>
              Sign up
            </Text>
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>

      <SecondModalComponent
        visible={modalVisible}
        setVisible={setModalVisible}
        name={name}
        setName={setName}
        password={password}
        setPassword={setPassword}
        handleConfirm={handleForgotPassword}
        recoveryCode={recoveryCode}
        setRecoveryCode={setRecoveryCode}
      />
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
      backgroundColor: "#073EFF",
      borderRadius: 10,
      width: Dimensions.get("screen").width * 0.90,
      alignItems: 'center',
      alignSelf: "center",
      paddingVertical: 20,
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