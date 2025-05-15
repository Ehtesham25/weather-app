import React, {useEffect, useState} from 'react';
import {View, Alert, Image} from 'react-native';
import {Card, Title} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';

const Home = props => {
  const [info, setInfo] = useState({
    name: 'loading..',
    temp: 'loading..',
    humidity: 'loading..',
    icon: 'loading..',
    descr: 'loading..',
  });
 
  useEffect(() => {
    getWeather();
  }, []);
  
  const getWeather = async () => {
    let myCity = await AsyncStorage.getItem('newcity');
    if (!myCity) {
      const {city} = props.route.params;
      myCity = city;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&APPID=4cdca6a93bdabb55c29a57264ce4dccc&units=metric`,
    )
      .then(res => res.json())
      .then(result => {
        setInfo({
          name: result.name,
          temp: result.main.temp,
          humidity: result.main.humidity,
          descr: result.weather[0].description,
          icon: result.weather[0].icon,
        });
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  };
  if (props.route.params.city != 'london') {
    getWeather();
  }
  return (
    <>
      <View style={{flex: 1}}>
        <Header name="Home Screeen" />
        <View style={{alignItems: 'center'}}>
          <Title style={{marginTop: 30, color: 'black', fontSize: 30}}>
            {info.name}
          </Title>
          <Image
            source={{
              uri: 'https://openweathermap.org/img/w/' + info.icon + '.png',
            }}
            style={{width: 120, height: 120, borderRadius: 60}}
          />
        </View>
        <Card style={{margin: 6, padding: 12}}>
          <Title style={{color: '#00aaff'}}>Temperature- {info.temp}</Title>
        </Card>
        <Card style={{margin: 6, padding: 12}}>
          <Title style={{color: '#00aaff'}}>humidity- {info.humidity} %</Title>
        </Card>
        <Card style={{margin: 6, padding: 12}}>
          <Title style={{color: '#00aaff'}}>description- {info.descr}</Title>
        </Card>
      </View>
    </>
  );
};
export default Home;
