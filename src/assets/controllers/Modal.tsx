import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

const ModalComponent = ({ word, visible, setVisible, handleConfirm }: any) => {
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
});

export default ModalComponent;