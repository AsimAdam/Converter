import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, Text, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { currencyURL } from "../assets/constants";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native";
import { RadioButton } from 'react-native-paper';

const Add = () => {
    const [accountDetails, setAccountDetails]: any = useState();
    const [currencies, setCurrencies]: any = useState([]);
    const [from, setFrom]: any = useState("");
    const [to, setTo]: any  = useState("");
    const [name, setName]: any = useState("");
    const [amount, setAmount]: any = useState();
    const [fromPicker, setFromPicker]: any = useState(false);
    const [toPicker, setToPicker]: any = useState(false);
    const [checked, setChecked] = React.useState(0);
    const [rate, setRate]: any = useState(0);
    // const [conversionAmount, setConversionAmount]
    const getDetails = async () => {
        const data: any = await AsyncStorage.getItem("account");
        setAccountDetails({...JSON.parse(data)})
    };
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
    useFocusEffect(
        React.useCallback(() => {
            getDetails();
            getCurrencyList();
        },[])
    );

    const calculate = async() => {
        
    };

    return(
        <ScrollView style={styles.container}>
                <Icon name="add-circle-sharp" color={"white"} size={45} style={{alignSelf: "center", marginTop: 20}} />
                <Text style={styles.title}>Save your conversion record:</Text>
                <View style={{flexDirection: "column", width: "90%", alignSelf: "center", alignItems: "center",  marginTop: 40, flex: fromPicker? 1 : 0}}>
                    <Text style={styles.bodyText}>Step 1: Choose the initial currency:</Text>
                    <DropDownPicker
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
                    <Text style={styles.bodyText}>Step 2: Choose the converted currency:</Text>
                    <DropDownPicker
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
                <View style={{flexDirection: "column", width: "90%", alignSelf: "center", alignItems: "center", marginTop: toPicker? 250 : 40}}>
                    <Text style={styles.bodyText}>Step 3: Enter amount to convert:</Text>
                    <TextInput
                        style={{width: "100%", alignSelf: "center", marginTop: 10, backgroundColor: "white", paddingVertical: 16, borderRadius: 10, fontSize: 18, paddingHorizontal: 15}}
                        placeholder="Enter amount here"
                        value={amount}
                        placeholderTextColor={"grey"}
                        onChangeText={setAmount}
                    />
                </View>
                <View style={{flexDirection: "column", width: "90%", alignSelf: "center", alignItems: "center", marginTop: 40}}>
                    <Text style={styles.bodyText}>Step 4: Keep track of where the amount was deposited:</Text>
                    <View style={{flexDirection: "row", alignItems: "center", width: "90%", alignSelf: "center", marginTop: 10}}>
                        <RadioButton.Android
                            color="white"
                            uncheckedColor="white"
                            value= ""
                            status={ checked === 0 ? 'checked' : 'unchecked' }
                            onPress={() => setChecked(0)}
                        />
                         <Text style={styles.bodyText}>My account</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", width: "90%", alignSelf: "center"}}>
                        <RadioButton.Android
                            color="white"
                            uncheckedColor="white"
                            value=""
                            status={ checked === 1 ? 'checked' : 'unchecked' }
                            onPress={() => setChecked(1)}
                        />
                        <Text style={styles.bodyText}>Transferred to someone else</Text>
                    </View>
                    {checked == 1 &&
                        <TextInput
                            style={{width: "100%", alignSelf: "center", marginTop: 10, backgroundColor: "white", paddingVertical: 16, borderRadius: 10, fontSize: 18, paddingHorizontal: 15}}
                            placeholder="Enter recipient's name"
                            value={name}
                            placeholderTextColor={"grey"}
                            onChangeText={setName}
                        />
                    }
                    </View>
                    <TouchableOpacity style={styles.button} onPress={calculate}>
                        <Text style={styles.buttonText}>🔢 Calculate</Text>
                    </TouchableOpacity>
        </ScrollView>
    )
};

export default Add;

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "black"
    },
    title:{
        marginTop: 20, 
        fontSize: 23,
        textAlign: "center",
        alignSelf: "center",
        width: "90%",
        color: "white"
    },
    bodyText:{
        fontSize: 20,
        alignSelf: "center",
        width: "100%",
        color: "white"
    },
    button:{
        width: "80%",
        paddingVertical: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText:{
        fontSize: 20,
        color:"black"
    }
});