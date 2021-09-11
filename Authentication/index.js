// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./login"
import Register from "./Register"

const Stack = createNativeStackNavigator();

function App() {
     return (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
               <Stack.Screen name="Login" component={Login} />
               <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
     );
}

export default App;

// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'

// const index = () => {
//      return (
//           <View>
//                <Text>S</Text>
//           </View>
//      )
// }

// export default index

// const styles = StyleSheet.create({ })
