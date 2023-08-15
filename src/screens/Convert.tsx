import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CountryFlag from "react-native-country-flag";


const Converter = () => {
    const [amount, setAmount] = useState('');
    const [sourceCurrency, setSourceCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState(0);
    const [conversionResult, setConversionResult] = useState('');
  
    useEffect(() => {
      const API_URL = `http://data.fixer.io/api/latest?access_key=2da44c532cf058fc68c02864af54f2f6`;
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          const rate = data.rates[targetCurrency] / data.rates[sourceCurrency];
          setExchangeRate(rate);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, [sourceCurrency, targetCurrency]);
  
    const handleConvert = () => {
      if (!amount) {
        return;
      }
      const convertedAmount = parseFloat(amount) * exchangeRate;
      const result = `${amount} ${sourceCurrency} = ${convertedAmount.toFixed(2)} ${targetCurrency}`;
      setConversionResult(result);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={sourceCurrency}
            onValueChange={(itemValue: any) => setSourceCurrency(itemValue)}
          >
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="EUR" value="EUR" />
          </Picker>
          <Picker
            selectedValue={targetCurrency}
            onValueChange={(itemValue: any) => setTargetCurrency(itemValue)}
          >
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="EUR" value="EUR" />
          </Picker>
          <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Convert</Text>
          </TouchableOpacity>
          {conversionResult !== '' && <Text style={styles.resultText}>{conversionResult}</Text>}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    borderRadius: 15
  },
  convertButton: {
    backgroundColor: '#000000', 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  wrapper: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginTop: 150,
    backgroundColor: '#d7d7d6'
  },
  resultText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Converter;
