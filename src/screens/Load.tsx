import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Load = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "black" }}>
      <ActivityIndicator size="large" color="white" />
      <Text style={{fontSize: 18, color: "white"}}>Loading</Text>
    </View>
  );
}

export default Load;
