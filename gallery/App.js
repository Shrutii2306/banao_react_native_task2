import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import {HomeScreen} from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';
import { GalleryScreen } from './screens/GalleryScreen';
import { StackActions } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();

function DrawerComponent({ navigation }) {
 
    
       // Access parent navigator and navigate to initial screen
       
        
 
}
function App() {

  return (
    
    <NavigationContainer>
      
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Home' component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}



export default App;