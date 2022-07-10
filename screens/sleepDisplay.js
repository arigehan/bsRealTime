import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function sleepDisplay({ navigation }) {

  const route = useRoute();

  const updateSleep = () => {
    axios.get('/1.2/user/-/sleep/date/2022-07-09.json', {
      headers: {'Authorization': `Bearer ${route.params.accessToken}`} 
    })
      .then(response =>  {
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        if (error.response) {
          console.log(error)
        } else {
          console.log(error.message)
        }
      })
  };

  useEffect(() => { //collects and refreshes data every 5 minutes
    updateSleep();
    const timer = setInterval(() => {
      updateSleep();
    }, 320000)

    return () => clearInterval(timer);

  }, [])

  function navToNS() {
    navigation.navigate('ConnectDexcom');
  }

  return (
    <View>
      <Button
        title="Next"
        onPress={() => navToNS()}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

