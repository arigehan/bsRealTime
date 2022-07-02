import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';


WebBrowser.maybeCompleteAuthSession();

export default function settings({ navigation }) {

  const [lowNotify, setLowNotify] = useState(80);
  const [lowAlarm, setLowAlarm] = useState(65);
  const [highNotify, setHighNotify] = useState(200);
  const [highAlarm, setHighAlarm] = useState(250);

  function navToSugar() {
    navigation.navigate('SugarGraph');
  }

  return (
    <View style={styles.container}>

        <View style={styles.SquareShapeView}>
            <Text>Low Notification (mg/dL)</Text>
            <TextInput
                style={styles.input}
                placeholder="80 mg/dL"
                onChangeText={newText => setLowNotify(newText)}
                defaultValue={lowNotify}
                keyboardType="numeric"
            />
            <Text>Low Alarm (mg/dL)</Text>
            <TextInput
                style={styles.input}
                placeholder="65 mg/dL"
                onChangeText={newText => setLowAlarm(newText)}
                defaultValue={lowAlarm}
                keyboardType="numeric"
            />
            <Text>Low Alarm Tone</Text>
        </View>

      <Text>High Notification (mg/dL)</Text>
      <TextInput
        style={styles.input}
        placeholder="200 mg/dL"
        onChangeText={newText => setHighNotify(newText)}
        defaultValue={highNotify}
        keyboardType="numeric"
      />
      <Button 
       title="Save"
       onPress={navToSugar}
       />
       <Text>High Alarm (mg/dL)</Text>
      <TextInput
        style={styles.input}
        placeholder="200 mg/dL"
        onChangeText={newText => setHighAlarm(newText)}
        defaultValue={highAlarm}
        keyboardType="numeric"
      />
      <Button 
       title="Save"
       onPress={navToSugar}
       />
      <Text>Low Alarm Tone</Text>

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
  SquareShapeView: {

    width: 330,
    height: 120,
    backgroundColor: '#00BCD4'

  },
});
