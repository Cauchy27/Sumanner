import { Audio } from 'expo-av';
import React, { useState, useRef, useEffect } from 'react';
import SoundPath from "../Parts/SoundPath";

const CallExcuseSound = (vol,recordingUri) => {
  console.log(SoundPath.excuse01);
  if(!recordingUri){
    playSound(SoundPath.excuse01,vol);
    return false;
  }

  playSound(recordingUri,vol);
}

const RecordingExcuseSound = (vol) => {
  console.log("recording");
}

// 効果音の再生
const playSound = (soundUri,vol=1) => {

  console.log('Playing ' + ":"+soundUri+" - vol:"+vol);

  // デフォルト音声
  let sound = {
    uri:soundUri
  }
  if(soundUri > 0){
    sound = soundUri;
  }
  Audio.Sound.createAsync(
    sound,
    {
      shouldPlay: true,
      volume: vol
    }
  ).then((res) => {
     res.sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.didJustFinish) return;
        // console.log('Unloading ' + name);
        res.sound.unloadAsync().catch(() => {});
     });
  }).catch((error) => {});
};

// const StartRecording = async(setRecording) => {
//   try {
//     console.log('Requesting permissions..');
//     await Audio.requestPermissionsAsync();
//     await Audio.setAudioModeAsync({
//       allowsRecordingIOS: true,
//       playsInSilentModeIOS: true,
//     });
//     console.log('Starting recording..');
//     const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
//     );
//     setRecording(recording);
//     console.log('Recording started');
//   } catch (err) {
//     console.error('Failed to start recording', err);
//   }
// }

// const StopRecording = async(setRecording) => {
//   console.log('Stopping recording..');
//   setRecording(undefined);
//   await recording.stopAndUnloadAsync();
//   await Audio.setAudioModeAsync({
//     allowsRecordingIOS: false,
//   });
//   const uri = recording.getURI();
//   console.log('Recording stopped and stored at', uri);
// }



export {
  CallExcuseSound,
  RecordingExcuseSound,
  // StartRecording,
  // StopRecording
}