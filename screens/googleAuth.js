import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native'; // was 'react-native-web' 

// ios client id: 
// 79485309173-tq4rnq6g8vllhguh52grdh2anu7dftq3.apps.googleusercontent.com

export default function googleAuth({ navigation }) {

  const onPress = () => {
    navigation.navigate('SugarGraph');
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Connect to Google</Text>
        </TouchableOpacity>
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
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  text: {
    fontSize: 30
  }
});
