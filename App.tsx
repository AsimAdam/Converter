import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Converter from './src/screens/Convert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChartScreen from './src/assets/controllers/ChartScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function TopTabs(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="SignIn" component={SignIn} />
      <Tab.Screen name="SignUp" component={SignUp} />
      <Tab.Screen name="Converter" component={Converter} />
    </Tab.Navigator>
  )
}

function App(): JSX.Element {
  const [accountSaved, setAccountSaved] = useState(false);
  const getAccount = async() => {
    const dataSaved = await AsyncStorage.getItem("account");
    if(dataSaved){
      setAccountSaved(true);
    }
    else{
      setAccountSaved(false);
    }
  };
  useEffect(() => {
    getAccount();
  },[]);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator screenOptions={{headerShown: false}} >
          {!accountSaved ?
            <Stack.Screen name="Login" component={SignIn} />
          : null}
          <Stack.Screen name="TopTabs" component={TopTabs} />
          <Stack.Screen name="Signin" component={SignIn} />
          <Stack.Screen name="Register" component={SignUp} />
          <Stack.Screen name="ChartScreen" component={ChartScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
