import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import scripts from './scripts.json';
import cybercrimeTools from './cybercrimeTools.json';
import Tts from 'react-native-tts';
import SpeechRecognition from 'react-native-speech-recognition';
import Communications from 'react-native-communications';

const App = () => {
  const [scriptsList, setScriptsList] = useState([]);
  const [customScript, setCustomScript] = useState('');
  const [customName, setCustomName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [spoofedNumber, setSpoofedNumber] = useState('');

  useEffect(() => {
    setScriptsList(Object.entries(scripts));
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultVoice('com.apple.ttsbundle.siri_Voice_en-US');
    SpeechRecognition.requestAuthorization().then((result) => {
      if (result === 'authorized') {
        SpeechRecognition.startListening();
      }
    });
  }, []);

  const handleAddCustomScript = () => {
    if (customName && customScript) {
      setScriptsList([...scriptsList, [customName, customScript]]);
      setCustomName('');
      setCustomScript('');
    }
  };

  const handleDeleteScript = (name) => {
    setScriptsList(scriptsList.filter(([n]) => n !== name));
  };

  const speakScript = (script) => {
    Tts.speak(script);
  };

  const recordOTP = () => {
    SpeechRecognition.startListening().then((result) => {
      if (result) {
        console.log('OTP recorded:', result);
        // Send the OTP to the app in real-time
        // You can use a state variable to store the OTP and display it in the app
      }
    });
  };

  const makePhoneCall = (phoneNumber) => {
    Communications.phonecall(phoneNumber, true);
  };

  const spoofNumber = (spoofedNumber) => {
    // You can use a service or API to spoof the number
    // For example, you can use a service like Twilio to spoof the number
    // This is a placeholder function
    console.log('Spoofing number to:', spoofedNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Interceptor App</Text>

      <details>
        <summary>Preloaded Scripts</summary>
        <FlatList
          data={scriptsList}
          keyExtractor={(item) => item[0]}
          renderItem={({ item: [name, script] }) => (
            <View style={styles.scriptItem}>
              <Text style={styles.scriptName}>{name}</Text>
              <Text>{script}</Text>
              <Button title="Speak" onPress={() => speakScript(script)} />
              <Button title="Record OTP" onPress={recordOTP} />
              <Button title="Delete" onPress={() => handleDeleteScript(name)} />
            </View>
          )}
        />
      </details>

      <details>
        <summary>Custom Scripts</summary>
        <TextInput
          placeholder="Custom Name"
          value={customName}
          onChangeText={setCustomName}
          style={styles.input}
        />
        <TextInput
          placeholder="Custom Script"
          value={customScript}
          onChangeText={setCustomScript}
          multiline
          style={styles.input}
        />
        <Button title="Add Custom Script" onPress={handleAddCustomScript} />
      </details>

      <details>
        <summary>Make a Call</summary>
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
        />
        <Button title="Call" onPress={() => makePhoneCall(phoneNumber)} />
      </details>

      <details>
        <summary>Spoof Number</summary>
        <TextInput
          placeholder="Spoofed Number"
          value={spoofedNumber}
          onChangeText={setSpoofedNumber}
          style={styles.input}
        />
        <Button title="Spoof" onPress={() => spoofNumber(spoofedNumber)} />
      </details>

      <details>
        <summary>Cybercrime Tools</summary>
        <FlatList
          data={Object.entries(cybercrimeTools)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item: [name, description] }) => (
            <View style={styles.toolItem}>
              <Text style={styles.toolName}>{name}</Text>
              <Text>{description}</Text>
            </View>
          )}
        />
      </details>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scriptItem: {
    marginBottom: 10,
  },
  scriptName: {
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  toolItem: {
    marginBottom: 10,
  },
  toolName: {
    fontWeight: 'bold',
  },
});

export default App;