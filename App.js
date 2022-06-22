import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [bloodGlucose, setBloodGlucose] = useState(0);

  const updateSGV = () => {
    axios.get('http://cgmari.herokuapp.com/api/v1/entries/current', {
      headers: {'API-SECRET': '80f33cadfe0ec3aa14574a4aa078a48ca4764a2b'},
    })
      .then(response => {
        console.log(response.data)
        let data = response.data
        // console.log(data[0].sgv);
        setBloodGlucose(data[0].sgv);
        // console.log(data);
      })
      .catch(error => {
        if (error.response) {
          //get HTTP error code
          console.log(error.response.status)
          console.log(error.message)
          console.log(error)
        } else {
          console.log(error.message)
        }
      })
  }

  useEffect(() => {
    updateSGV();
    const timer = setInterval(() => {
      updateSGV();
    }, 320000)

    return () => clearInterval(timer);
  }, [])
  

  return (
    <View style={styles.container}>
      <Text>Current Blood Glucose:</Text>
      <Text>{bloodGlucose}</Text>
      <StatusBar style="auto" />
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
});
