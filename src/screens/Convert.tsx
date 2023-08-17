import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { currencyURL, rateURL } from "../assets/constants";
import Icon from 'react-native-vector-icons/Ionicons';

const Converter = ({navigation}: any) => {
  const [from, setFrom]: any = useState("");
  const [to, setTo]: any  = useState("");
  const [currencies, setCurrencies]: any = useState([]);
  const [fromPicker, setFromPicker]: any = useState(false);
  const [toPicker, setToPicker]: any = useState(false);
  const [rate, setRate]: any = useState(0);

  const getCurrencyList = async() => {
    const response = await fetch(currencyURL, {
        method: "GET",
    });
    const res = await response.json(); 
    const mappedData = Object.keys(res).map(key => ({
        label: `${key} - ${res[key]}`,
        value: key
    }));
    setCurrencies(mappedData);
  };

  useEffect(() => {
    getCurrencyList();
  },[]);

  const calculate = async() => {
    if(from == "" || to == ""){
        Alert.alert("Please fill all values for calculation.");
        return;
    }
    const response = await fetch(`${rateURL}/${from}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    });
    const res = await response.json(); 
    setRate(res.rates[to]);
    return res.rates[to];
  };

  return(
    <ScrollView style={styles.container}>
          <View style={{flexDirection: "row", alignItems: "center", alignSelf: "center"}}>
            <Icon name="calculator" size={30} color="white" />
            <Text style={{fontSize: 22, fontWeight: "600", textAlign: "center", alignSelf: "center", color: "white"}}>  Convert currency</Text>
          </View>

        <View style={{flexDirection: "column", width: "90%", alignSelf: "center", alignItems: "center",  marginTop: 40, flex: fromPicker? 1 : 0}}>
          <Text style={styles.bodyText}>Choose the initial currency:</Text>
          <DropDownPicker
              onOpen={() => setRate(0)}
              open={fromPicker}
              value={from}
              items={currencies}
              setOpen={setFromPicker}
              setValue={setFrom}
              setItems={setCurrencies}
              placeholder="From: Choose currency" 
              placeholderStyle={{color: "black"}}
              containerStyle={{width: "100%", alignSelf: "center", marginTop: 10}}
              textStyle={{fontSize: 18, color: "black"}}
          />
        </View>
        <View style={{flexDirection: "column", width: "90%", alignSelf: "center", alignItems: "center", marginTop: fromPicker ? 250 : 40, flex: toPicker? 1 : 0}}>
          <Text style={styles.bodyText}>Choose the converted currency:</Text>
          <DropDownPicker
              onOpen={() => setRate(0)}
              open={toPicker}
              value={to}
              items={currencies}
              setOpen={setToPicker}
              setValue={setTo}
              setItems={setCurrencies}
              placeholder="To: Choose currency"
              placeholderStyle={{color: "black"}}
              containerStyle={{width: "100%", alignSelf: "center", marginTop: 10}}
              textStyle={{fontSize: 18, color: "black"}}
          />
        </View>
        {rate !== 0 ?
          <View style={{flexDirection: "column", width: "90%", alignSelf: "center", alignItems: "center", marginTop: 20}}>
              <Text style={styles.resultsText}>1 {from} = {rate} {to}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Chart", {url: from+to, nav: true})}>
                <Text style={styles.linkText}>Click here to check forex trend if available for {from}{to}</Text>
              </TouchableOpacity>
          </View>
        : null}
        <TouchableOpacity style={[styles.button, {marginTop: toPicker? 250 : 100}]} onPress={calculate}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
    </ScrollView>
  )
};

export const styles= StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: "black"
    },
    bodyText:{
      fontSize: 20,
      alignSelf: "center",
      width: "100%",
      color: "white"
    },
    button:{
      width: "90%",
      paddingVertical: 15,
      backgroundColor: "#073EFF",
      borderRadius: 10,
      alignSelf: "center",
      marginTop: 30,
      justifyContent: "center",
      alignItems: "center"
    },
    buttonText:{
      fontSize: 20,
      color:"white"
    },
    resultsText:{
      fontSize: 20,
      alignSelf: "center",
      width: "100%",
      color: "lightgreen",
      textAlign: "center",
    },
    linkText:{
      fontSize: 20,
      alignSelf: "center",
      width: Dimensions.get("screen").width * 0.95,
      color: "red",
      textAlign: "center",
      marginTop: 10
  }
});

export default Converter;
