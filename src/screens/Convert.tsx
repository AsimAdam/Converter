import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import currencySymbolMap from 'currency-symbol-map';

const Converter = () => {
  const [amount, setAmount] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [conversionResult, setConversionResult] = useState('');
  const [currencyOptions, setCurrencyOptions] = useState([]);





  useEffect(() => {
    const API_URL = `https://openexchangerates.org/api/latest.json?app_id=ccebe6cd0d884dbaac76453a0a5d1619`;
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const availableCurrencies: any = Object.keys(data.rates);
        setCurrencyOptions(availableCurrencies);
        setSourceCurrency(availableCurrencies[0]);
        setTargetCurrency(availableCurrencies[1]);
        const rate = data.rates[availableCurrencies[0]] / data.rates[availableCurrencies[1]];
        setExchangeRate(rate);
  
    
        const timestamp = data.timestamp;
        // console.log('Timestamp:', timestamp);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  
  let convertedAmount = 0;

  const handleConvert = () => {
    if (!amount || isNaN(exchangeRate)) {
      return;
    }
  
    const convertedAmount = parseFloat(amount) * exchangeRate; 
    console.log('Amount:', amount);
    console.log('Exchange Rate:', exchangeRate);
    console.log('Converted Amount:', convertedAmount);
  
    const result = `${amount} ${currencySymbolMap(sourceCurrency)} = ${convertedAmount.toFixed(2)} ${currencySymbolMap(targetCurrency)}`;
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
            // console.log('Conversion history saved:', newHistory);
          })
          .catch((error) => {
            // console.error('Error saving conversion history:', error);
          });
      })
      .catch((error) => {
        // console.error('Error fetching conversion history:', error);
      });
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
          {currencyOptions.map((currency) => (
            <Picker.Item
              key={currency}
              label={`${currency} - ${currencySymbolMap(currency)}`}
              value={currency}
            />
          ))}
        </Picker>

        <Text style={styles.toText}>to</Text>

       
        <Picker
          style={styles.picker}
          selectedValue={targetCurrency}
          onValueChange={(itemValue) => setTargetCurrency(itemValue)}
        >
          {currencyOptions.map((currency) => (
            <Picker.Item
              key={currency}
              label={`${currency} - ${currencySymbolMap(currency)}`}
              value={currency}
            />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
        <Image
          source={require('../assets/exchange.png')}
          style={{ width: 30, height: 30, alignSelf: 'center', marginRight: 10 }}
          resizeMode="contain"
        />
        <Text style={styles.convertButtonText}>Convert</Text>
      </TouchableOpacity>
      {conversionResult !== '' && (
        <Text style={styles.resultText}>
          {amount} {currencySymbolMap(sourceCurrency)} ={' '}
          <Text style={styles.resultNumber}>{(parseFloat(amount) * exchangeRate).toFixed(2)}</Text>{' '}
          {/* <Text style={styles.resultNumber}>{(parseFloat(amount) / exchangeRate).toFixed(2)}</Text>{' '} */}
          {currencySymbolMap(targetCurrency)}
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
    backgroundColor: '#151617',
    borderRadius: 25,
    color: 'white',
  },
  toText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: 'white'
  },
  convertButton: {
    backgroundColor: '#151617',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: Dimensions.get("screen").width * 0.90,
  },
  convertButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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