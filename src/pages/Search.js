import React, { useState } from "react";
import {Text, View,FlatList} from "react-native"
import {TextInput,Button,Card} from "react-native-paper"
import Header from "../components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search =({navigation})=>{

    const[city,setCity]= useState()
    const[cities,setCities]= useState([]);
    
    const FetchCity=(text)=>{
      console.log("text is", text)
         setCity(text)
        
      fetch("https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query="+text+"&locationType=city&format=json")    
      .then(res=>res.json())    
      .then(data=>{    
        console.log("dat is", data)
       setCities(data.location.address.slice(0,9))
       console.log( "data is", data.location.address.slice(0,9))
    })

    }

    const btnClick= async ()=>{
      await AsyncStorage.setItem("newcity", city)
      navigation.navigate("Home", {city:city})
    }
    const cityList= async (cityname)=>{
      await AsyncStorage.setItem("newcity", cityname)
      setCity(cityname)
      navigation.navigate("Home",{city:cityname})
      
    }
    return(
        <>
        <View style={{flex:1}}>
        <Header name="Search Screen"/>
        <TextInput
      label="City"
      value={city}
      onChangeText={(text)=>FetchCity(text)}
    />
     <Button style={{margin:25}} onPress={()=>btnClick()} icon="content-save-move-outline" mode="contained" 
     theme={{colors:{primary:'#00aaff'}}}> <Text style={{color:'white'}}>Save Changes</Text>
  
  </Button>
            <FlatList
              data={cities}
              renderItem={({item})=>{
                return(
                  <Card onPress={()=>cityList(item)} style={{margin:3, padding:12}}>
                    <Text>{item}</Text>
                  </Card>
                )
              }}
              keyExtractor={(item)=>{item}}
            />
            </View>
        </>
    )
}
export default Search;