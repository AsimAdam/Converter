import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Converter from './src/screens/Convert';
import Record from './src/screens/Record';
import { SvgXml } from 'react-native-svg';
import svg from './src/assets/controllers/svg';
import History from './src/screens/History';


const Tab = createMaterialTopTabNavigator();
const signInIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" />
`;
function getTabBarIcon(routeName: string) {
  if (routeName === 'SignIn') {
    return <SvgXml xml={signInIcon} />;
  } else if (routeName === 'SignUp') {
    
  } else if (routeName === 'Converter') {

  } else if (routeName === 'Record') {
 
  }
}
function App(): JSX.Element {
  const [amount, setAmount] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: '#000000' }, 
            tabBarIndicatorStyle: { backgroundColor: '#0068FF' }, 
            tabBarActiveTintColor: '#0068FF', 
            tabBarInactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="SignIn" component={SignIn}/>
          <Tab.Screen name="History" component={History} />
          <Tab.Screen name="Converter" component={Converter} />
          <Tab.Screen name="Record" component={Record} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default App;
