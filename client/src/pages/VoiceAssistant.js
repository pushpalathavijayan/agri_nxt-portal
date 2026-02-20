import React, { useState } from 'react';
import { Card, Button } from '../components/Common';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const mockResponses = [
    'Based on current market prices, rice is expected to yield better returns this season.',
    'Your soil pH is optimal for growing wheat. Consider it for Rabi season.',
    'I recommend using drip irrigation to optimize water usage and reduce costs.',
    'Your farm is eligible for the PM KISAN scheme. Apply through your nearest center.',
  ];

  const handleStartListening = () => {
    setIsListening(true);
    setRecognizedText('');
    setAiResponse('');

    // Simulate voice recognition
    setTimeout(() => {
      const mockQueries = [
        'What crop should I plant?',
        'How can I increase my profit?',
        'What are the government schemes available?',
        'How is my soil health?',
      ];
      const randomQuery = mockQueries[Math.floor(Math.random() * mockQueries.length)];
      setRecognizedText(randomQuery);
    }, 2000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setAiResponse(randomResponse);
    }, 1000);
  };

  const handleClear = () => {
    setIsListening(false);
    setRecognizedText('');
    setAiResponse('');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6">🎤 Voice Assistant</h1>

      <Card className="mb-6">
        <h2 className="text-xl font-bold mb-6 text-center">Voice Query System</h2>

        <div className="flex justify-center mb-8">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
            isListening
              ? 'bg-red-500 animate-pulse shadow-lg shadow-red-400'
              : 'bg-green-600 hover:bg-green-700 shadow-lg'
          }`}>
            <button
              onClick={isListening ? handleStopListening : handleStartListening}
              className="w-full h-full flex items-center justify-center text-white text-4xl rounded-full"
            >
              🎤
            </button>
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 mb-2">
            {isListening ? '🔴 Listening...' : '🟢 Ready to listen'}
          </p>
          {isListening && (
            <div className="flex justify-center gap-1">
              <div className="w-2 h-8 bg-green-500 animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-8 bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-8 bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-2 h-8 bg-green-500 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          )}
        </div>

        <div className="text-center mb-6">
          <p className="text-xs text-gray-500">
            {isListening ? 'Click mic to stop listening' : 'Click mic to start listening'}
          </p>
        </div>

        {recognizedText && (
          <Card className="mb-4 bg-blue-50 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 mb-2">Your Query:</p>
            <p className="text-lg font-semibold text-blue-600">{recognizedText}</p>
          </Card>
        )}

        {aiResponse && (
          <Card className="mb-4 bg-green-50 border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-2">AI Assistant Response:</p>
            <p className="text-lg text-green-700">{aiResponse}</p>
          </Card>
        )}

        {(recognizedText || aiResponse) && (
          <div className="flex gap-4">
            <Button variant="secondary" onClick={handleClear} className="flex-1">
              Clear
            </Button>
            <Button variant="primary" onClick={handleStartListening} className="flex-1" disabled={isListening}>
              Ask Another
            </Button>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-bold text-green-700 mb-3">💡 Try Asking:</h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            <li>What crop should I plant?</li>
            <li>How can I improve profit?</li>
            <li>What schemes am I eligible for?</li>
            <li>How is my soil health?</li>
          </ul>
        </Card>

        <Card>
          <h3 className="font-bold text-green-700 mb-3">📋 Instructions:</h3>
          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li>Click the microphone button</li>
            <li>Speak your question clearly</li>
            <li>Click again to stop</li>
            <li>Get AI-powered response</li>
          </ol>
        </Card>
      </div>

      <Card className="mt-4 bg-yellow-50 border-l-4 border-yellow-500">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> This is a demo voice interface. In production, this would integrate with speech recognition APIs (Web Speech API, Google Cloud Speech-to-Text, etc.) and advanced NLP models.
        </p>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
