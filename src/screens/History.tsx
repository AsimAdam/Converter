import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const historyJSON = await AsyncStorage.getItem('conversionHistory');
        if (historyJSON !== null) {
          const parsedHistory = JSON.parse(historyJSON).filter((item: any) => typeof item === 'object');
          setHistory(parsedHistory);
        }
      } catch (error) {
        console.error('Error fetching conversion history:', error);
      }
    };
  
    getHistory();
  }, []);
  

  const renderItem = ({ item }: any) => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleString('default', { month: 'short', day: 'numeric' });
  
    return (
      <View style={styles.historyItem}>
        <View>
          <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Last Conversion</Text>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>{`${item.sourceAmount} ${item.sourceCurrency} = ${item.targetAmount} ${item.targetCurrency}`}</Text>
        </View>
  
        <View>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>{`${formattedDate}`}</Text>
        </View>
      </View>
    );
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Conversion History</Text>
        </View>
        {history.length > 0 ? (
          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={(item: any, index: any) => index.toString()}
            contentContainerStyle={styles.sliderContainer}
            ListEmptyComponent={() => {
              return (
                <View style={styles.no_history}>
                  <Text style={styles.noData}>No conversion history available.</Text>
                </View>
              );
            }}
          />
        ) : (
          <Text>No conversion history available.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15
  },
  title: {
    color: 'black',
    fontSize: 20
  },
  sliderContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#000000'
  },
  noData: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#151617',
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 10
  },
  no_history: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HistoryScreen;
