import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

export default function Settings({ navigation }) {

  const [lowNotify, setLowNotify] = useState(80);
  const [lowAlarm, setLowAlarm] = useState(65);
  const [highNotify, setHighNotify] = useState(200);
  const [highAlarm, setHighAlarm] = useState(250);

  function navToSugar() {
    navigation.navigate('SugarGraph');
  }

  return (
    <View style={styles.container}>

        <Text/> 
        <Text/> 
        <Text/>
        <Text/> 
        <Text/> 
        <Text/> 
        <Text/> 
        <Text/> 
        <Text/> 
 
        <Pressable style={styles.button} onPress={navToSugar}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>

        <Text/> 
        <Text/> 

        <Text>Low Settings:</Text>
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
            <TextInput //CHANGE THIS
                style={styles.input}
                placeholder="Ongoing Beeps"
            />
        </View>

        <Text/> 
        <Text/>

        <Text>High Settings:</Text>
        <View style={styles.SquareShapeView}>
            <Text>High Notification (mg/dL)</Text>
            <TextInput
                style={styles.input}
                placeholder="200 mg/dL"
                onChangeText={newText => setHighNotify(newText)}
                defaultValue={highNotify}
                keyboardType="numeric"
            />
            <Text>High Alarm (mg/dL)</Text>
            <TextInput
                style={styles.input}
                placeholder="250 mg/dL"
                onChangeText={newText => setHighAlarm(newText)}
                defaultValue={highAlarm}
                keyboardType="numeric"
            />
            <Text>High Alarm Tone</Text>
            <TextInput //change this!!!
                style={styles.input}
                placeholder="Bells"
            />
        </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  SquareShapeView: {
    width: 330,
    height: 120,
    backgroundColor: '#88cde0',
  },
  button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#88cde0',
  },
  buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
  }
});
