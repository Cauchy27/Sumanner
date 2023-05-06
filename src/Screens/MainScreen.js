import React, { useState, useRef, useEffect } from 'react';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';

import {callExcuseSound} from "../Parts/Sound";

const MainScreen = () => {

  const callExcuse = () => {
    callExcuseSound();
  }

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
        <Button
          onPress = {()=>{
            callExcuse();
          }}
        >
          すいませーん
        </Button>
    </Layout>
  );
}

export default MainScreen;
