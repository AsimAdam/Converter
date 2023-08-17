import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const History = () => {
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
        <ScrollView style={styles.container}>
            <View style={{flexDirection: "row", alignItems: "center", alignSelf: "center"}}>
                <Icon name="history" size={30} color="white" />
                <Text style={{fontSize: 22, fontWeight: "600", textAlign: "center", alignSelf: "center", color: "white"}}>  My History</Text>
            </View>

            {accountDetails?.history?.map((record: any, index: any) => {
                return(
                    <View key={index} style={styles.main_container}>
                        <View style={styles.inner_container}>
                            <Text style={styles.innerText}>From:{" "}
                                <Text style={{color: "green"}}>
                                    {record.from}
                                </Text>
                            </Text>
                            <Text style={styles.innerText}>To:{" "}
                                <Text style={{color: "green"}}>
                                    {record.to}
                                </Text>
                            </Text>
                        </View>
                        <Text style={styles.text}>Deposited:{" "}
                            <Text style={{color: "green"}}>
                                {record.deposit}
                            </Text>
                        </Text>
                        <Text style={styles.text}>Amount:{" "}
                            <Text style={{color: "green"}}>
                                {record.totalAmount}
                            </Text>
                        </Text>
                        <Text style={styles.text}>Rate of conversion at transaction:{"\n"}
                            <Text style={{color: "green"}}>
                                1 {record.from} = {record.rate} {record.to}
                            </Text>
                        </Text>
                    </View>
                )
            })}

            {!accountDetails?.history || accountDetails?.history?.length == 0 ?
                <View style={{flexDirection: "column", alignItems: "center", alignSelf: "center", marginTop: 200}}>
                    <Icon name="do-not-disturb-alt" size={30} color="white" />
                    <Text style={{fontSize: 22, fontWeight: "600", textAlign: "center", alignSelf: "center", color: "white", marginTop: 10}}>No history available</Text>
                </View>
            : null}
            
        </ScrollView>
    )

}

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "black"
    },
    main_container:{
        flexDirection: "column",
        width: "90%",
        alignSelf: "center",
        paddingVertical: 15,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 20,
    },
    inner_container:{
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
    },
    innerText:{
        fontSize: 18,
        color: "black",
        alignSelf: "center",
        fontWeight: "500"
    },
    text:{
        fontSize: 18,
        color: "black",
        alignSelf: "center",
        width: "90%",
        marginTop: 5,
        fontWeight: "500"
    }
})

export default History;