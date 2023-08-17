import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Dimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import OTPInputView from '@twotalltotems/react-native-otp-input'

export const ModalComponent = ({ word, visible, setVisible, handleConfirm }: any) => {
    return(
        <Modal
            isVisible={visible}
            backdropOpacity={0.3}
            animationInTiming={500}
            animationOutTiming={350}
            statusBarTranslucent={true}
            style={styles.modal}
        >
            <View style={styles.modalCont}>
                <TouchableOpacity onPress={() => setVisible(!visible)} style={{alignSelf: "flex-end", marginRight: 20}}>
                    <Icon name="close-circle-outline" color={"black"} size={22} />
                </TouchableOpacity>
                <Text style={styles.warning}>Warning</Text>
                <Text style={styles.ready}>{word} is ready. Do you want to start?</Text>
                <View style={styles.buttonsCont}>
                    <TouchableOpacity style={[styles.buttons, {backgroundColor: "#F7F7FA"}]} onPress={() => setVisible(!visible)}>
                        <Text style={[styles.buttonText, {color: "black"}]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttons, {backgroundColor: "black"}]} onPress={handleConfirm}>
                    <Text style={[styles.buttonText, {color: "white"}]}>Confirm</Text> 
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

export const SecondModalComponent = ({ visible, setVisible, handleConfirm, name, setName, password, setPassword, recoveryCode, setRecoveryCode }: any) => {
    useEffect(() => {
        if(!visible){
            setName("");
            setPassword("");
            setRecoveryCode("");
        }
    },[visible]);
    
    return(
        <Modal
            isVisible={visible}
            backdropOpacity={0.3}
            animationInTiming={500}
            animationOutTiming={350}
            statusBarTranslucent={true}
            style={styles.modal}
        >
            <View style={styles.modalCont}>
                <TouchableOpacity onPress={() => setVisible(!visible)} style={{alignSelf: "flex-end", marginRight: 20}}>
                    <Icon name="close-circle-outline" color={"black"} size={22} />
                </TouchableOpacity>
                <Text style={styles.warning}>Reset Password</Text>
                <Text style={styles.ready}>Input the name or email for the account you want to reset password for:</Text>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name or email here"
                    placeholderTextColor={"#d7d7d6"}
                />
                <Text style={styles.ready}>Input your recovery code:</Text>
                <TextInput
                    style={styles.textInput}
                    value={recoveryCode}
                    onChangeText={setRecoveryCode}
                    placeholder="Enter your recovery code here"
                    placeholderTextColor={"#d7d7d6"}
                    maxLength={6}
                    keyboardType='number-pad'
                />
                <Text style={styles.ready}>Input the new password:</Text>
                <TextInput
                    style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter new password here"
                    placeholderTextColor={"#d7d7d6"}
                />
                <View style={styles.buttonsCont}>
                    <TouchableOpacity style={[styles.buttons, {backgroundColor: "black"}]} onPress={() => setVisible(!visible)}>
                        <Text style={[styles.buttonText, {color: "white"}]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttons, {backgroundColor: "#073EFF"}]} onPress={() => handleConfirm(name)}>
                    <Text style={[styles.buttonText, {color: "white"}]}>Confirm</Text> 
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

export const styles = StyleSheet.create({
    modal:{
        flex:1,
        justifyContent: "center",
        margin: 0
    },
    modalCont:{
        width: "90%",
        borderRadius: 15,
        justifyContent: "center",
        paddingVertical: 30,
        backgroundColor: "#fff",
        alignSelf: "center"
    },
    cancel:{
        fontSize: 15, 
        color: "black", 
        alignSelf: "flex-end", 
        marginRight: 20
    },
    warning:{
        fontSize: 20, 
        color: "black", 
        alignSelf: "center", 
        fontWeight: "600",
        marginTop: 10
    },
    ready:{
        fontSize: 18,
        color: "#909BAD",
        alignSelf: "center", 
        marginTop: 15,
        width: "90%",
        textAlign: "center"
    },
    buttonsCont:{
        flexDirection: "row",
        width: "90%",
        alignSelf: "center",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
    },
    buttons:{
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 10
    },
    buttonText:{
        fontSize: 16,
    },
    textInput:{
        width: "90%",
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
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: "black"
    },
    underlineStyleHighLighted: {
        borderColor: "black",
    },
});

export default ModalComponent;