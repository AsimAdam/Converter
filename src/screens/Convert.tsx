import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { color } from 'react-native-elements/dist/helpers';
import currencyCodes from 'currency-codes';
import CurrencyInput from 'react-native-currency-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import currencySymbolMap from 'currency-symbol-map';


const Converter = () => {
  const [amount, setAmount] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [conversionResult, setConversionResult] = useState('');
  const [currencyOptions, setCurrencyOptions] = useState<any>([]);

  useEffect(() => {
    const API_URL = `http://data.fixer.io/api/latest?access_key=2da44c532cf058fc68c02864af54f2f6`;
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        
        const availableCurrencies = Object.keys(data.rates);

        console.log('Available Currencies:', availableCurrencies); 
        setCurrencyOptions(availableCurrencies);
        setSourceCurrency(availableCurrencies[0]);
        setTargetCurrency(availableCurrencies[1]);

       
        const rate = data.rates[targetCurrency] / data.rates[sourceCurrency];
        setExchangeRate(rate);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  const handleConvert = () => {
    if (!amount) {
      return;
    }
    
    const convertedAmount = parseFloat(amount) * exchangeRate;
  const result = `${amount} ${sourceCurrency} = ${convertedAmount.toFixed(2)} ${currencySymbolMap(targetCurrency)}`;
  setConversionResult(result);
  
   
    const conversionHistory = {
      sourceAmount: amount,
      sourceCurrency,
      targetAmount: convertedAmount.toFixed(2),
      targetCurrency,
      date: new Date().toISOString(),
    };
  
    AsyncStorage.getItem('conversionHistory')
      .then((data) => {
        const existingHistory = data ? JSON.parse(data) : [];
        const newHistory = [...existingHistory, conversionHistory];
        
        AsyncStorage.setItem('conversionHistory', JSON.stringify(newHistory))
          .then(() => {
            console.log('Conversion history saved:', newHistory);
          })
          .catch((error) => {
            console.error('Error saving conversion history:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching conversion history:', error);
      });
  };
  const saveConversionToHistory = async (result: any) => {
    try {
      const history = await AsyncStorage.getItem('conversionHistory');
      const updatedHistory = history ? JSON.parse(history).concat(result) : [result];
      await AsyncStorage.setItem('conversionHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving conversion history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor="gray"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.row}>
        
      <Picker
        style={styles.picker}
        selectedValue={sourceCurrency}
        onValueChange={(itemValue) => setSourceCurrency(itemValue)}
      >
        {currencyOptions.map((currency: any) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <Text style={styles.toText}>to</Text>
      <Picker
        style={styles.picker}
        selectedValue={targetCurrency}
        onValueChange={(itemValue) => setTargetCurrency(itemValue)}
      >
        {currencyOptions.map((currency: any) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>

      </View>
      <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Convert</Text>
      </TouchableOpacity>
      {conversionResult !== '' && (
  <Text style={styles.resultText}>
    {amount} {currencySymbolMap(sourceCurrency)} ={' '}
    <Text style={styles.resultNumber}>{(parseFloat(amount) * exchangeRate).toFixed(2)}</Text> {currencySymbolMap(targetCurrency)}
  </Text>
)}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    backgroundColor: '#151617',
    marginRight: 8,
    color: 'white',
  },
  picker: {
    flex: 1,
    height: 50,
    backgroundColor: '#0068FF',
    borderRadius: 25,
    color: 'white',
  },
  toText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  convertButton: {
    backgroundColor: '#151617',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  resultText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
  },
  resultNumber: {
    fontSize: 30,
    color: 'green',
  },
});

export default Converter;
function saveConversionToHistory(result: string) {
  throw new Error('Function not implemented.');
}

