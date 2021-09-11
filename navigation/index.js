// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { useportfolioContext } from '../context/Portfolio';
import Auth from "../Authentication/index"
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';



function App() {
     const { cred } = useportfolioContext()
     const user = cred.user
     return (
          <>
               {user === null && <SplashScreen />}
               {user === true && <Home />}
               {user === false && <Auth />}
          </>
     );
}

export default App;