import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApiKey from './useApiKey';

function Home() {
  const { apiKey, apiKeySet } = useApiKey();
  const [seed, setSeed] = useState([]);

  useEffect(() => {
    if (apiKey) {
      // Only call getSeed if apiKey has been set
      getSeed();
    }
  }, [apiKey]);

  const getSeed = () => {
    const ro = Math.floor(Math.random() * 48)
    fetch(`https://api.spotify.com/v1/browse/new-releases?country=TR&offset=${ro}&limit=12`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + apiKey
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.albums.items);
        setSeed(data.albums.items);
      });
  };

  return (
    <div className="App">
      <div className="Home">
        <h1>Önerilenler</h1>
        {seed.length ? (
          <div className="flee">
            {seed.map((item, index) => (
              <div key={index}>
              <Link to={"/album/" + item.id}>
                <img src={item.images[1].url} alt={item.name} />
              </Link>
                <p>{item.name}</p>
                <p className="artist">{item.artists[0].name}</p>
                <p style={{ color: 'gray' }}>{item.release_date}</p>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Home;
