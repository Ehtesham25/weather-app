import { StatusBar,} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { Home, Search } from './src/pages';

const Stack = createBottomTabNavigator();

const App=()=>{
  return(
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#00aaff"/>
    <NavigationContainer >
      <Stack.Navigator 
      screenOptions={({route})=>({
        tabBarIcon:({color})=>{
          let iconName
          if(route.name==="Home"){
            iconName='home-city'
          
          }
          else if(route.name==="Search")
          {
            iconName='home-search'
           
          }
          return <MaterialCommunityIcons name={iconName} size={30} color={color}/>
        },
       headerShown: false,
       tabBarActiveBackgroundColor:"white",
       tabBarInactiveTintColor:"grey",
       tabBarActiveTintColor:"#00aaff"
      })}
      >
        <Stack.Screen name="Home"  component={Home} initialParams={{city:"kuala lumpur"}} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}

export default App;


// tabBarOptions={{
//   activeBackgroundColor:'white',
//   inactiveTintColor:'grey',
//   activeTintColor:"#00aaff"
  
// }}