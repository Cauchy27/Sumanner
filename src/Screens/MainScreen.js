import React, { useState, useRef, useEffect } from 'react';
import { ImageProps, StyleSheet, View } from 'react-native';
import { ApplicationProvider, Layout, Text, Button, ButtonGroup, Spinner ,Icon } from '@ui-kitten/components';
import { Audio } from 'expo-av';

import {
  CallExcuseSound,
  RecordingExcuseSound,
  // StartRecording,
  // StopRecording
} from "../Parts/Sound";

const MainScreen = () => {

  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState([]);
  const [recordingUri, setRecordingUri] = useState("");
  const [recordingStatus, setRecordingStatus] = useState(false);
  const [playingStatus, setPlayingStatus] = useState(false);

  const callExcuse = () => {
    console.log(volume,recordingUri);
    CallExcuseSound(volume,recordingUri);
  }
  const recordingExcuse = () => {
    console.log("recording start!!");
    StartRecording();

    console.log(recording);
  }
  const recordingStopExcuse = () => {
    console.log("recording stop!!");
    StopRecording();
  }

  const StartRecording = async() => {
    try {
      setRecordingStatus(true);
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
      setRecordingStatus(false);
    }
  }
  
  const StopRecording = async() => {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    setRecordingUri(uri);
    setRecordingStatus(false);
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button10: {
      margin: "10%",
    },
    button5: {
      margin: "5%",
    },
    indicator: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <Layout 
      style = {
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
    >
        { recordingStatus == true &&
          <Text
            category='h1'
          >
            録 音 中 
          </Text>
        }
        <Button
          onPress = {()=>{
            recordingExcuse();
          }}
          style={styles.button5}
          status='success'
          size='giant'
        >
          録音開始
        </Button>
        <Button
          onPress = {()=>{
            recordingStopExcuse();
          }}
          style={styles.button5}
          status='danger'
          size='giant'
        >
          録音停止
        </Button>
        <Button
          onPress = {()=>{
            callExcuse();
          }}
          style={styles.button10}
          status='primary'
          size='giant'
          disabled={recordingStatus}
          // appearance='outline'
        >
          すいませーん{recordingUri != "" &&  "\n（録音音源）"}
        </Button>
        <Button
          onPress = {()=>{
            setRecordingUri("");
          }}
          style={styles.button5}
          status='primary'
          size='small'
          appearance='ghost'
        >
          音源リセット
        </Button>
    </Layout>
  );
}

export default MainScreen;
