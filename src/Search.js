import { useState, useEffect, useRef } from 'react'
import useApiKey from './useApiKey'

function Search() {
  const { apiKey } = useApiKey()
  const [searchRes, setSearchRes] = useState([])
  const [searchQ, setSearchQ] = useState([])
  const [playingSongId, setPlayingSongId] = useState(null)
  const audioRef = useRef(null)

  const getSearchRes = () => {
    fetch(`https://api.spotify.com/v1/search?q=${searchQ}&type=track&limit=24&include_external=audio`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + apiKey
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.tracks.items)
        setSearchRes(data.tracks.items)
      })
  }

  const handlePlayPause = (songId) => {
    if (playingSongId === songId) {
      setPlayingSongId(null)
    } else {
      setPlayingSongId(songId)
    }
  }

  useEffect(() => {
    if (playingSongId) {
      const selectedSong = searchRes.find(item => item.id === playingSongId)
      if (selectedSong && audioRef.current) {
        audioRef.current.src = selectedSong.preview_url
        audioRef.current.play()
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [playingSongId])

  useEffect(() => {
    // Pause the currently playing song when a new search is performed
    setPlayingSongId(null)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [searchQ])

  const msToDuration = ms => {
    const ss = Math.floor(ms / 1000)
    const m = Math.floor(ss / 60)
    const s = ss % 60

    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="App">
      <div className="Search">
        <input
          placeholder="80 Milyon şarkı arasından arama yapın."
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              getSearchRes()
            }
          }}
        />

        {searchRes.length ? (
          <div>
            <h1>Arama sonuçları</h1>
            <div className="flee">
              {searchRes.map((item, index) => (
                <div key={index} className="sfflex">
                  <div>
                    <img src={item.album.images[2].url} alt={item.album.name} title={item.album.name} />
                  </div>
                  <div className="sfflex-r">
                    <div>
                      <p>{item.name}</p>
                      <p className="artist">{item.artists[0].name}</p>
                      <p style={{ color: 'gray' }}>{msToDuration(item.duration_ms)}</p>
                    </div>
                    <div>
                      {playingSongId === item.id ? (
                        <>
                          <audio ref={audioRef} id={item.id}>
                            <source src={item.preview_url} type="audio/mpeg" />
                          </audio>
                          <button className="playpause"
                            onClick={() => handlePlayPause(item.id)}
                          >
                            <img src="/pause-button.svg" />
                          </button>
                        </>
                      ) : (
                        <button className="playpause"
                          onClick={() => handlePlayPause(item.id)}
                        >
                          <img src="/play-button.svg" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default Search
