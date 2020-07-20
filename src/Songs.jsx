import React, { useState, useEffect } from "react";
import AppContext from "./context";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Clicks = (props) => {
  const [appState, setAppState] = useState(null);

  const favouriteClick = (ev) => {
    const songs = appState.songs.map((song) => ({
      ...song,
      ...{
        favourite:
          song.trackId === parseInt(ev.currentTarget.id, 10)
            ? !song.favourite
            : song.favourite,
      },
    }));

    AppContext.setSongs(songs);
    AppContext.setFavouritesCount(songs.filter((song) => song.favourite).length);
  };

  useEffect(() => {
    const subscription = AppContext.subscribe(setAppState);

    async function fetchSongs() {
      const data = await fetch(
        "https://itunes.apple.com/search?term=kanye&country=IN"
      )
        .then((response) => response.json())
        .catch((err) => console.log(err));

      AppContext.setSongs(data.results.map((song) => ({
        ...song,
        ...{ favourite: false },
      })));
      AppContext.setTotalSongs(data.resultCount);
    }
    setTimeout(() => fetchSongs(), 2000);

    return () => subscription.unsubscribe();
  }, []);

  if(!appState) return null;
  
  const { songs } = appState;

  return (
    <div className={"songs"}>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Song</th>
            <th>Like</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.trackId}>
              <td>{song.artistName}</td>
              <td>{song.trackName}</td>
              <td>
                <button id={song.trackId} onClick={favouriteClick}>
                  {song.favourite ? <FaHeart /> : <FaRegHeart />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clicks;
