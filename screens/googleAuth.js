import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native'; // was 'react-native-web' 


// ios client id: 
// 79485309173-tq4rnq6g8vllhguh52grdh2anu7dftq3.apps.googleusercontent.com

export default function googleAuth() {

  return (
    <View style={styles.container}>
        <TouchableOpacity><Text>Connect to Google</Text></TouchableOpacity>
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
