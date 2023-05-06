import { Audio } from 'expo-av';
import React, { useState, useRef, useEffect } from 'react';
import SoundPath from "../Parts/SoundPath";

const callExcuseSound = (sound) => {
  playSound(SoundPath.excuse01);
}

// 効果音の再生に使う
const playSound = (sound,vol=1) => {

  console.log('Playing ' + ":"+sound);
  Audio.Sound.createAsync(
     sound, {
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

export {
  callExcuseSound
}