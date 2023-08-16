import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const Account = () => {
    const [accountDetails, setAccountDetails]: any = useState();
    const getDetails = async () => {
        const data: any = await AsyncStorage.getItem("account");
        setAccountDetails({...JSON.parse(data)})
    };
    useFocusEffect(
        React.useCallback(() => {
            getDetails();
        },[])
    );

    return(
        <View style={styles.container}>
            <Icon name="person-circle-sharp" size={130} color="white" style={styles.person_profile} />
            {accountDetails?.name &&
                <Text style={styles.text}>Name: {accountDetails?.name}</Text>
            }
            <Text style={styles.text}>Email: {accountDetails?.email}</Text>
            <Text style={styles.text_1}>My Tracked Balance: {accountDetails?.balance ? accountDetails?.balance : "0.00"}</Text>
            <Text style={styles.text_1}>Total Currency Transfers: {accountDetails?.transfers ? accountDetails?.transfers : "0.00"}</Text>
        </View>
    )
};

export default Account;

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "black"
    },
    person_profile:{
        alignSelf: "center",
        marginTop: 20
    },
    text:{
        fontWeight:"600", 
        fontSize: 20, 
        color: "white", 
        textAlign: "center", 
        marginTop: 10,
        width: "90%",
        alignSelf: "center"
    },
    text_1:{
        fontWeight:"600", 
        fontSize: 20, 
        color: "white", 
        textAlign: "center", 
        marginTop: 40,
        width: "90%",
        alignSelf: "center"
    }
});