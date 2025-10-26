import { useState, useEffect } from 'react';

const useApiKey = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiKeySet, setApiKeySet] = useState(false);

  const getApiKey = async () => {
    try {
      const res = await fetch('/api/getSpotifyToken');
      const data = await res.json();
      setApiKey(data.access_token);

      const expirationTime = new Date().getTime() + data.expires_in * 1000;
      localStorage.setItem('apiKey', data.access_token);
      localStorage.setItem('expirationTime', expirationTime.toString());
      setApiKeySet(true);
    } catch (err) {
      console.error("Failed to fetch Spotify token", err);
    }
  };

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey');
    const expirationTime = localStorage.getItem('expirationTime');
    const currentTime = new Date().getTime();

    if (storedApiKey && expirationTime && currentTime < expirationTime) {
      setApiKey(storedApiKey);
      setApiKeySet(true);
    } else {
      getApiKey();
    }
  }, []);

  return { apiKey, apiKeySet };
};

export default useApiKey;
