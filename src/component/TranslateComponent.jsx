import React, { useState } from 'react';
import axios from 'axios';
import { GiSpeaker } from "react-icons/gi";

function TranslateComponent() {
  const [to, setTo] = useState('en');
  const [from, setFrom] = useState('en');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const languages = [
    { code: 'af', name: 'Afrikaans' },
    { code: 'ar', name: 'Arabic' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'bn', name: 'Bengali' },
    { code: 'bs', name: 'Bosnian' },
    { code: 'ca', name: 'Catalan' },
    { code: 'cs', name: 'Czech' },
    { code: 'cy', name: 'Welsh' },
    { code: 'da', name: 'Danish' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'et', name: 'Estonian' },
    { code: 'fa', name: 'Persian' },
    { code: 'fi', name: 'Finnish' },
    { code: 'fr', name: 'French' },
    { code: 'he', name: 'Hebrew' },
    { code: 'hi', name: 'Hindi' },
    { code: 'hr', name: 'Croatian' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'id', name: 'Indonesian' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'lv', name: 'Latvian' },
    { code: 'ml', name: 'Malayalam' }, 
    { code: 'ms', name: 'Malay' },
    { code: 'mt', name: 'Maltese' },
    { code: 'nl', name: 'Dutch' },
    { code: 'no', name: 'Norwegian' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ro', name: 'Romanian' },
    { code: 'ru', name: 'Russian' },
    { code: 'sk', name: 'Slovak' },
    { code: 'sl', name: 'Slovenian' },
    { code: 'sv', name: 'Swedish' },
    { code: 'sw', name: 'Swahili' },
    { code: 'ta', name: 'Tamil' },
    { code: 'th', name: 'Thai' },
    { code: 'tr', name: 'Turkish' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'ur', name: 'Urdu' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'zh-Hans', name: 'Chinese (Simplified)' },
    { code: 'zh-Hant', name: 'Chinese (Traditional)' }
  ];

  const translate = async () => {
    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        'api-version': '3.0',
        profanityAction: 'NoAction',
        textType: 'plain',
        from: from,
        to: to,
      },
      headers: {
        'x-rapidapi-key': '27732f943bmsh343d037c9647f48p157800jsnef1d6adf908a',
        'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: [{ Text: input }],
    };

    try {
      const response = await axios.request(options);
      setOutput(response.data[0].translations[0].text);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  const speak = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-gradient-to-l from-blue-800 to-blue-300 shadow-lg rounded-xl p-6 w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center font-mono text-white"></h1>
        <div className="flex flex-col sm:flex-row mb-6 space-y-4 sm:space-y-0 sm:space-x-4 ">
          <div className="flex-1">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-gray-50"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {languages.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-2 rounded-full focus:outline-none transition duration-200 transform hover:scale-110"
            onClick={() => {
              setFrom(to);
              setTo(from);
              setInput(output);
              setOutput(input);
            }}
          >
            ⇄
          </button>
          <div className="flex-1">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-gray-50"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {languages.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
  <div className="flex-1 relative">
    <textarea
      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition duration-200 bg-gray-50"
      rows="8"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter text to translate"
    ></textarea>
    <button
      className="absolute top-2 right-2 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      onClick={() => speak(input, from)}
    >
      <GiSpeaker
        className='text-black text-2xl' />
    </button>
  </div>
  <div className="flex-1 relative">
    <textarea
      className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none resize-none transition duration-200"
      rows="8"
      value={output}
      readOnly
      placeholder="Translation will appear here"
    ></textarea>
    <button
      className="absolute top-2 right-2 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      onClick={() => speak(output, to)}
    >
       <GiSpeaker
      className='text-black text-2xl' />
    </button>
  </div>
</div>

        <div className="mt-8 text-center">
          <button
            className="bg-blue-900 hover:bg-blue-400 text-white px-8 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 transform hover:scale-105 shadow-md"
            onClick={translate}
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
}

export default TranslateComponent;
