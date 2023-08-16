import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Converter from './src/screens/Convert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChartScreen from './src/assets/controllers/ChartScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Account from './src/screens/Account';
import Add from './src/screens/Add';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function TopTabs(){
  return(
    <Tab.Navigator
    screenOptions={({ route }: any) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: 'black',
      },
      tabBarIcon: ({ focused, color, size }: any) => { 
        let iconName: any;
        if (route.name === 'Account') {
          iconName = "manage-accounts";
        } else if (route.name === 'Add') {
          iconName = "add-task";
        } else if (route.name === 'Converter') {
          iconName = "currency-exchange";
        }
        else if (route.name === 'History') {
          iconName = "manage-history";
        }
        return <MaterialIcons name={iconName} size={23} color={focused ? "white" : "#909BAD"} />;
      },
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "#909BAD",
    })}
    >
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Converter" component={Converter} />
      <Tab.Screen name="History" component={Converter} />
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
    <PaperProvider>
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator screenOptions={{headerShown: false}} >
          {/* {!accountSaved ? */}
            <Stack.Screen name="Login" component={SignIn} />
          {/* : null} */}
          <Stack.Screen name="TopTabs" component={TopTabs} />
          <Stack.Screen name="Signin" component={SignIn} />
          <Stack.Screen name="Register" component={SignUp} />
          <Stack.Screen name="ChartScreen" component={ChartScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
