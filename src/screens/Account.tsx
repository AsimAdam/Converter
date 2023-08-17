import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View, Text, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Account = ({ navigation }: any) => {
    const [accountDetails, setAccountDetails]: any = useState();

    const getDetails = async () => {
        const data: any = await AsyncStorage.getItem("account");
        setAccountDetails({...JSON.parse(data)});
    };

    useFocusEffect(() => {
        getDetails();
    });

    const logout = async () => {
        await AsyncStorage.setItem("account", "");
        Alert.alert("Logged out");
        navigation.navigate("Signin");
    };

    const viewRecoveryCode = () => {
        Alert.alert(`This is your recovery code: ${accountDetails.code}.` + "\n" + "Please keep it safe and do not share it with anyone")
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{flexDirection: "row", alignItems: "center", alignSelf: "center"}}>
                <Icon name="person-circle" size={30} color="white" />
                <Text style={{fontSize: 22, fontWeight: "600", textAlign: "center", alignSelf: "center", color: "white"}}>  My Account</Text>
            </View>
            
            <View style={styles.profileContainer}>
                <Text style={styles.nameText}>{accountDetails?.name}</Text>
                <Text style={styles.emailText}>{accountDetails?.email}</Text>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>My Tracked Balance</Text>
                    <View style={styles.balanceContainer}>
                        {accountDetails?.balance ? (
                            Object.keys(accountDetails.balance).map(key => (
                                <Text key={key} style={styles.balanceText}>
                                    {key}: {accountDetails.balance[key]}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.balanceText}>0.00</Text>
                        )}
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Total Currency Transfers</Text>
                    <View style={styles.transferContainer}>
                        {accountDetails?.transfers ? (
                            Object.keys(accountDetails.transfers).map(key => (
                                <Text key={key} style={styles.transferText}>
                                    {key}: {accountDetails.transfers[key]}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.transferText}>0.00</Text>
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.viewCodeButton} onPress={viewRecoveryCode}>
                    <Icon name="eye-sharp" size={24} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>View Recovery Code</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <MaterialIcon name="logout" size={24} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    profileContainer: {
        alignItems: "center",
        paddingVertical: 40,
    },
    personProfile: {
        marginBottom: 10,
    },
    nameText: {
        fontWeight: "600",
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginBottom: 5,
    },
    emailText: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
    },
    infoContainer: {
        paddingHorizontal: 20,
    },
    infoRow: {
        marginBottom: 20,
    },
    infoLabel: {
        fontWeight: "600",
        fontSize: 18,
        color: "white",
        marginBottom: 5,
    },
    balanceContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    balanceText: {
        fontSize: 16,
        color: "white",
        marginRight: 10,
    },
    transferContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    transferText: {
        fontSize: 16,
        color: "white",
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 30,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewCodeButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginRight: 5,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "500",
    },
});
