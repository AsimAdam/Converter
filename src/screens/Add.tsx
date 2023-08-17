import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, Text, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { currencyURL, rateURL, updateURL } from "../assets/constants";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native";
import { RadioButton } from 'react-native-paper';
import { Alert } from "react-native";

const Add = ({navigation, route}: any) => {
    const [accountDetails, setAccountDetails]: any = useState();
    const [currencies, setCurrencies]: any = useState([]);
    const [from, setFrom]: any = useState("");
    const [to, setTo]: any  = useState("");
    const [name, setName]: any = useState("");
    const [amount, setAmount]: any = useState("");
    const [fromPicker, setFromPicker]: any = useState(false);
    const [toPicker, setToPicker]: any = useState(false);
    const [checked, setChecked] = React.useState(0);
    const [rate, setRate]: any = useState(0);
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
           Promise.all([ getDetails(), getCurrencyList()]);
           setAmount("");
           setRate(0);
        },[])
    );

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

    const save = async() => {
        var current_rate = rate;
        if(from == "" || to == "" || amount == ""){
            Alert.alert("Please fill all values to save.");
            return;
        }
        if(current_rate == 0){
            current_rate = await calculate();
        }
        var arr: any = [];
        var totalAmount = (parseFloat(amount) * current_rate).toFixed(3);
        var account: any = {...accountDetails};
        accountDetails.history ? arr = [...accountDetails.history] : null;
        arr.push({from: from, to: to, totalAmount: totalAmount, rate: current_rate, deposit: checked == 0 ? "My account" : name});
        account.history = arr;
        if(checked == 0){
            if(account.balance){
                if (account.balance[to]) {
                    const originalBalance = parseFloat(account.balance[to]);
                    const newBalance = originalBalance + parseFloat(totalAmount);
                    account.balance[to] = newBalance.toFixed(3);
                } else {
                    account.balance[to] = totalAmount;
                }
            }
            else{
                account.balance = {[to] : totalAmount};
            }
        }
        else{
            if(account.transfers){
                if (account.transfers[to]) {
                    const originalBalance = parseFloat(account.transfers[to]);
                    const newBalance = originalBalance + parseFloat(totalAmount);
                    account.transfers[to] = newBalance.toFixed(3);
                } else {
                    account.transfers[to] = totalAmount;
                }
            }
            else{
                account.transfers = {[to] : totalAmount};
            }
        }
        const response = await fetch(updateURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(account)
        });
        const res = await response.json(); 
        Alert.alert(res.message);
        if(res.message == "Account updated"){
            await AsyncStorage.setItem("account", JSON.stringify(account));
            navigation.navigate("TopTabs", {screen: "Account"});
        }
    };

    return(
        <ScrollView style={styles.container}>
                <View style={{flexDirection: "row", alignItems: "center", alignSelf: "center"}}>
                    <Icon name="add-circle-sharp" size={30} color="white" />
                    <Text style={{fontSize: 22, fontWeight: "600", textAlign: "center", alignSelf: "center", color: "white"}}>  Save Conversion</Text>
                </View>

                <View style={{flexDirection: "column", width: "90%", alignSelf: "center", alignItems: "center",  marginTop: 40, flex: fromPicker? 1 : 0}}>
                    <Text style={styles.bodyText}>Step 1: Choose the initial currency:</Text>
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
                    <Text style={styles.bodyText}>Step 2: Choose the converted currency:</Text>
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
                    {rate !== 0 ?
                        <View style={{flexDirection: "column", width: "90%", alignSelf: "center", alignItems: "center", marginTop: 20}}>
                            <Text style={styles.resultsText}>1 {from} = {rate} {to}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Chart", {url: from+to, nav: true})}>
                                <Text style={styles.linkText}>Click here to check forex trend if available for {from}{to}</Text>
                            </TouchableOpacity>
                        </View>
                    : null}
                    {rate !== 0 && amount !== "" ?
                        <View style={{flexDirection: "column", width: "90%", alignSelf: "center", alignItems: "center", marginTop: 20}}>
                            <Text style={styles.resultsText}>Total amount approx. = {(parseFloat(amount) * rate).toFixed(3)} {to}</Text>
                        </View>
                    : null}
                    <View style={{flexDirection: "row", width: "90%", alignItems: "center", alignSelf: "center", justifyContent: "space-between"}}>
                        <TouchableOpacity style={styles.button} onPress={calculate}>
                            <Text style={styles.buttonText}>Calculate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={save}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
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
        width: "40%",
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