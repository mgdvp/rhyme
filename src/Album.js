import { useParams } from 'react-router-dom';

import { useState, useEffect, useRef } from 'react'
import useApiKey from './useApiKey'

function Album() {
  const { id } = useParams()

  const { apiKey } = useApiKey()
  const [searchRes, setSearchRes] = useState([])
  const [albumInf, setAlbumInf] = useState('')
  const [playingSongId, setPlayingSongId] = useState(null)
  const audioRef = useRef(null)

  useEffect(() => {
    if (apiKey) {
      // Only call getSeed if apiKey has been set
      getSearchRes();
    }
  }, [apiKey]);
  const getSearchRes = () => {
    console.clear()
    fetch(`https://api.spotify.com/v1/albums/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + apiKey
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setAlbumInf({
          img: data.images[1].url,
          name: data.name,
          release: data.release_date,
          total: data.total_tracks
        })
      })

    fetch(`https://api.spotify.com/v1/albums/${id}/tracks?offset=0&limit=50&locale=tr-TR&include_external=audio`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + apiKey
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setSearchRes(data.items)
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

  const msToDuration = ms => {
    const ss = Math.floor(ms / 1000)
    const m = Math.floor(ss / 60)
    const s = ss % 60

    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="App">
      <div className="Album">
        {searchRes.length ? (
          <div>
            <h1>{albumInf.name}</h1>
            <p style={{ color: 'gray', marginBottom: '1rem' }}>{albumInf.release}</p>
            <p style={{ color: '#bbb', marginBottom: '1rem' }}>Toplam {albumInf.total} parça</p>
             <img src={albumInf.img} />
            <div className="flee">
              {searchRes.map((item, index) => (
                <div key={index} className="sfflex">
                  <div>
                  </div>
                  <div className="sfflex-r">
                    <div>
                      <p>{item.name}</p>
                      <p className="artist">{item.artists[0].name}</p>
                      <p style={{ color: 'gray' }}>{msToDuration(item.duration_ms)}</p>
                    </div>
                    <div>
                      {playingSongId === item.id ?  (
                        <>
                          <audio ref={audioRef} id={item.id}>
                            <source src={item.preview_url} type="audio/mpeg" />
                          </audio>
                          <button className="playpause"
                            onClick={() => {
                              if(item.preview_url){
                                handlePlayPause(item.id)
                              } else alert('Bu şarkı için önizleme bulunamadı.')
                            }}
                          >
                            <img src="/pause-button.svg" />
                          </button>
                        </>
                      ) : (
                        <button className="playpause"
                          onClick={() => {
                            if(item.preview_url){
                              handlePlayPause(item.id)
                            } else alert('Bu şarkı için önizleme bulunamadı.')
                          }}
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

export default Album
