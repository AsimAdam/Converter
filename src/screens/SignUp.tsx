import React, { useState } from "react";
import { Alert } from "react-native";
import { Dimensions, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { addUrl, url } from "../assets/constants";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { emptyFields } from "../assets/constants";
import ModalComponent from "../assets/controllers/Modal";
 
const SignUp = ({navigation, route}: any) => {
  const [visible, setVisible] = useState(false);
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nav, setNavigation]: any = useState("");
  const [load, setLoad] = useState(false);
  const [viewPass, setViewPass] = useState(true);
  const [viewConfirmPass, setViewConfirmPass] = useState(true);
  const handleBack = () => {
    navigation.goBack();
  };
  const createAccount = async() => {
    if(password == "" || confirmPassword == "" || email == ""){
      setLoad(false);
      Alert.alert(emptyFields);
      return;
    }
    if(password == confirmPassword){
      const number = randomSixDigitNumber().toString();
      const account = {email: email, password: password, name: name, code: number};
      await AsyncStorage.setItem("account", JSON.stringify(account))
      .then(async () => {
        const response = await fetch(addUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }, 
            body: JSON.stringify(account),
        });
        const res = await response.json(); 
        setLoad(false);
        Alert.alert(res.message + "!" + "\n" + `This is your recovery code: ${number}.` + "\n" + "Please keep it safe and do not share it with anyone");
        navigation.navigate("TopTabs");
      })
    }
    else{
      setLoad(false);
      Alert.alert("Passwords do not match.");
    }
  };
  const handleConfirm = async() => {
    await AsyncStorage.setItem("navigated", nav?.isNav);
    setVisible(!visible);
    navigation.navigate("ChartScreen", {url: nav?.isNav, nav: false});
  };
  const submitHandler = async () =>{
    if(name !== ""){
        try {
          setLoad(true);
          const response = 
            await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "text/plain",
                }, 
                body: name.trim(),
            });
            const res = await response.json();
            setLoad(false);
            if(res.isNav !== ""){
              setLoad(false);
              setNavigation(res);
              setVisible(true);
            }
            else{
              createAccount();
            }
        } catch (error) {
          console.log("Error", error);
          setLoad(false);
        }
      }
      else{
        createAccount();
      }
  };

  const randomSixDigitNumber = () => {
    const min = 100000; // Minimum value (inclusive)
    const max = 999999; // Maximum value (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  

  return (
    <KeyboardAvoidingView style={styles.container}> 
      <View style={{flexDirection: "row", width: "95%", justifyContent: "space-between", alignItems: "center", alignSelf: "center"}}>
        <TouchableOpacity onPress={handleBack}>
          <Image source={require('../assets/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', alignSelf: 'center'}}>Sign up</Text>
        <View style={styles.icon} />
      </View>

      <TextInput
        style={styles.nameInput}
        placeholder="Enter your email here"
        value={email}
        placeholderTextColor={"#d7d7d6"}
        onChangeText={setEmail}
      />

      <View style={[styles.emailInput, {flexDirection: "row", alignItems: "center", justifyContent: "space-between"}]}>
        <TextInput
          style={styles.textInputText}
          placeholder="Enter your password here"
          value={password}
          secureTextEntry={viewPass}
          placeholderTextColor={"#d7d7d6"}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.eyeButton} onPress={() => setViewPass(!viewPass)}>
          <Icon name={viewPass ? 'eye-off' : 'eye'} size={20} color='#d7d7d6' />
        </TouchableOpacity>
      </View>

      <View style={[styles.emailInput, {flexDirection: "row", alignItems: "center", justifyContent: "space-between"}]}>
        <TextInput
          style={styles.textInputText}
          placeholder="Confirm password"
          value={confirmPassword}
          secureTextEntry={viewConfirmPass}
          placeholderTextColor={"#d7d7d6"}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.eyeButton} onPress={() => setViewConfirmPass(!viewConfirmPass)}>
          <Icon name={viewConfirmPass ? 'eye-off' : 'eye'} size={20} color='#d7d7d6' />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.nameInput}
        placeholder="Name (Optional)"
        value={name}
        placeholderTextColor={"#d7d7d6"}
        onChangeText={setname}
      />

      <TouchableOpacity style={styles.signInButton} onPress={submitHandler}>
        <Text style={{ color: 'white', fontSize: 18 }}>Create Acoount</Text>
      </TouchableOpacity>

      <ModalComponent
        word={name}
        visible={visible} 
        setVisible={setVisible}
        handleConfirm={handleConfirm}
      />

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20
  },
  icon: {
    width: 30,
    height: 30,
  },
  eyeButton: {
    width: 20,
    height: 20,
    alignSelf: "center"
  },
  nameInput: {
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
  textInputText:{
    color: "white",
    fontSize: 16
  },
  signInButton: {
    backgroundColor: "#073EFF",
    borderRadius: 10,
    width: Dimensions.get("screen").width * 0.90,
    alignItems: 'center',
    alignSelf: "center",
    paddingVertical: 20,
    marginTop: 30
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
  

});




export default SignUp;

