// useApiKey.js

import { useState, useEffect } from 'react';

const useApiKey = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiKeySet, setApiKeySet] = useState(false);

  const getApiKey = () => {
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id:  process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setApiKey(data.access_token);
        const expirationTime = new Date().getTime() + data.expires_in * 1000;
        localStorage.setItem('apiKey', data.access_token);
        localStorage.setItem('expirationTime', expirationTime.toString());
      });
  };

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey');
    const expirationTime = localStorage.getItem('expirationTime');
    const currentTime = new Date().getTime();

    if (storedApiKey && expirationTime && currentTime < expirationTime) {
      // API key exists in localStorage and has not expired
      setApiKey(storedApiKey);
      setApiKeySet(true);
    } else {
      // API key doesn't exist or has expired, fetch a new one
      getApiKey();
    }
  }, []);

  return { apiKey, apiKeySet };
};

export default useApiKey;
