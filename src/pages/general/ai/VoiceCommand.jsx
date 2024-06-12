/* eslint-disable react/prop-types */
// src/components/VoiceCommand.js
import  { useEffect, useRef } from 'react';

const VoiceCommand = ({ onCommand }) => {
    const recognitionRef = useRef(null);

    useEffect(() => {
      const startRecognition = () => {
        recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognitionRef.current.lang = 'en-US';
        recognitionRef.current.continuous = true;
  
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[event.resultIndex][0].transcript.trim();
          onCommand(transcript);
        };
  
        // recognitionRef.current.onend = () => {
        //   console.log('Recognition ended. Restarting...');
        //   startRecognition();
        // };
  
        // recognitionRef.current.onerror = (event) => {
        //   console.error('Recognition error:', event.error);
        //   startRecognition();
        // };
  
        recognitionRef.current.start();
      };
  
      startRecognition();
  
      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          recognitionRef.current = null;
        }
      };
    }, [onCommand]);
  
    return null;
  };

export default VoiceCommand;
