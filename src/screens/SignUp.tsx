import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CountryPicker from 'react-native-country-picker-modal';

 
const SignUp = () => {
    const [name, setname] = useState('');
    const [selectedCountry, setSelectedCountry]: any = useState(null);
    // const navigation = useNavigation();
    
    const handleBack = () => {
      // navigation.goBack();
    }
    const handleSignIn = () => {

    }
    
    const submitHandler = () => {
    
    }
    return (

<SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
    <View style={styles.container}>
     
    <TouchableOpacity onPress={handleBack} style={{ position: 'absolute', top: 10, left: 2 }}>
        <Image source={require('../assets/back.png')} style={styles.icon} />
      </TouchableOpacity>
      <Image source={require("../assets/register.png")} style={{width: 200, height: 200, alignSelf: "center"}} resizeMode="contain" />
     
      <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', marginTop: 10, marginBottom: 10, alignSelf: 'center'}}>Sign up</Text>

      <TextInput
        style={styles.nameInput}
        placeholder="Enter your email here"
        value={name}
        placeholderTextColor={"#d7d7d6"}
        onChangeText={setname}
      />
      <TextInput
        style={styles.emailInput}
        placeholder="Enter your password here"
        value={name}
        placeholderTextColor={"#d7d7d6"}
        onChangeText={setname}
      />
        <TextInput
        style={styles.nameInput}
        placeholder="Confirm password"
        value={name}
        placeholderTextColor={"#d7d7d6"}
        onChangeText={setname}
      />
        <TextInput
        style={styles.nameInput}
        placeholder="Name (Optional)"
        value={name}
        placeholderTextColor={"#d7d7d6"}
        onChangeText={setname}
      />

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={{ color: 'white', fontSize: 18 }}>Create Acoount</Text>
      </TouchableOpacity>
      
    
     
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20
  },
  icon: {
    width: 30,
    height: 30,
  },

  nameInput: {
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
  

});




export default SignUp;

